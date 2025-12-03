import { getFirestore } from '../config/firebase.js';

// Get all institutions with ratings
export const getAllInstitutions = async (req, res) => {
    try {
        const db = getFirestore();

        // Get all institutions
        const institutionsSnapshot = await db.collection('institutions').orderBy('nama', 'asc').get();

        const institutionsWithScores = await Promise.all(
            institutionsSnapshot.docs.map(async (doc) => {
                const institutionData = { id: doc.id, ...doc.data() };

                // Get admin ratings for this institution
                const adminRatingsSnapshot = await db.collection('adminRatings')
                    .where('institutionId', '==', doc.id)
                    .get();

                // Get criteria for weighted calculation
                const criteriaSnapshot = await db.collection('criteria').get();
                const criteriaMap = {};
                criteriaSnapshot.docs.forEach(criterionDoc => {
                    criteriaMap[criterionDoc.id] = criterionDoc.data();
                });

                // Calculate admin score (weighted average)
                let adminScore = null;
                if (!adminRatingsSnapshot.empty) {
                    let totalWeightedScore = 0;
                    let totalWeight = 0;

                    adminRatingsSnapshot.docs.forEach(ratingDoc => {
                        const rating = ratingDoc.data();
                        const criterion = criteriaMap[rating.criterionId];
                        if (criterion) {
                            const weight = parseFloat(criterion.bobot) || 1;
                            totalWeightedScore += rating.nilai * weight;
                            totalWeight += weight;
                        }
                    });

                    adminScore = totalWeight > 0 ? (totalWeightedScore / totalWeight) : null;
                }

                // Get public ratings for this institution
                const publicRatingsSnapshot = await db.collection('publicRatings')
                    .where('institutionId', '==', doc.id)
                    .get();

                // Calculate public score (average)
                let publicScore = null;
                let publicCount = publicRatingsSnapshot.size;
                if (!publicRatingsSnapshot.empty) {
                    const sum = publicRatingsSnapshot.docs.reduce((acc, ratingDoc) => {
                        return acc + ratingDoc.data().rating;
                    }, 0);
                    publicScore = sum / publicCount;
                }

                return {
                    ...institutionData,
                    adminScore: adminScore ? Math.round(adminScore * 10) / 10 : null,
                    publicScore: publicScore ? Math.round(publicScore * 10) / 10 : null,
                    publicRatingCount: publicCount
                };
            })
        );

        res.json({
            success: true,
            data: institutionsWithScores
        });
    } catch (error) {
        console.error('Get all institutions error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};

// Get single institution
export const getInstitution = async (req, res) => {
    try {
        const { id } = req.params;
        const db = getFirestore();

        const institutionDoc = await db.collection('institutions').doc(id).get();

        if (!institutionDoc.exists) {
            return res.status(404).json({
                success: false,
                message: 'Institution not found.'
            });
        }

        const institutionData = { id: institutionDoc.id, ...institutionDoc.data() };

        // Get admin ratings
        const adminRatingsSnapshot = await db.collection('adminRatings')
            .where('institutionId', '==', id)
            .get();

        const adminRatings = adminRatingsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Get public ratings
        const publicRatingsSnapshot = await db.collection('publicRatings')
            .where('institutionId', '==', id)
            .get();

        const publicRatings = publicRatingsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.json({
            success: true,
            data: {
                ...institutionData,
                AdminRatings: adminRatings,
                PublicRatings: publicRatings
            }
        });
    } catch (error) {
        console.error('Get institution error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};

// Create institution (admin only)
export const createInstitution = async (req, res) => {
    try {
        const { nama, alamat, email } = req.body;

        if (!nama || !alamat || !email) {
            return res.status(400).json({
                success: false,
                message: 'Please provide nama, alamat, and email.'
            });
        }

        const db = getFirestore();
        const institutionRef = await db.collection('institutions').add({
            nama,
            alamat,
            email,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const institutionDoc = await institutionRef.get();

        res.status(201).json({
            success: true,
            message: 'Institution created successfully.',
            data: { id: institutionDoc.id, ...institutionDoc.data() }
        });
    } catch (error) {
        console.error('Create institution error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};

// Update institution (admin only)
export const updateInstitution = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, alamat, email } = req.body;

        const db = getFirestore();
        const institutionRef = db.collection('institutions').doc(id);
        const institutionDoc = await institutionRef.get();

        if (!institutionDoc.exists) {
            return res.status(404).json({
                success: false,
                message: 'Institution not found.'
            });
        }

        const updateData = {
            updatedAt: new Date()
        };

        if (nama) updateData.nama = nama;
        if (alamat) updateData.alamat = alamat;
        if (email) updateData.email = email;

        await institutionRef.update(updateData);

        const updatedDoc = await institutionRef.get();

        res.json({
            success: true,
            message: 'Institution updated successfully.',
            data: { id: updatedDoc.id, ...updatedDoc.data() }
        });
    } catch (error) {
        console.error('Update institution error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};

// Delete institution (admin only)
export const deleteInstitution = async (req, res) => {
    try {
        const { id } = req.params;

        const db = getFirestore();
        const institutionRef = db.collection('institutions').doc(id);
        const institutionDoc = await institutionRef.get();

        if (!institutionDoc.exists) {
            return res.status(404).json({
                success: false,
                message: 'Institution not found.'
            });
        }

        // Delete associated ratings
        const adminRatingsSnapshot = await db.collection('adminRatings')
            .where('institutionId', '==', id)
            .get();

        const publicRatingsSnapshot = await db.collection('publicRatings')
            .where('institutionId', '==', id)
            .get();

        const batch = db.batch();
        adminRatingsSnapshot.docs.forEach(doc => batch.delete(doc.ref));
        publicRatingsSnapshot.docs.forEach(doc => batch.delete(doc.ref));
        batch.delete(institutionRef);

        await batch.commit();

        res.json({
            success: true,
            message: 'Institution deleted successfully.'
        });
    } catch (error) {
        console.error('Delete institution error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};
