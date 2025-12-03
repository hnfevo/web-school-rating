import { getFirestore } from '../config/firebase.js';

// Submit or update admin ratings (admin only)
export const submitAdminRatings = async (req, res) => {
    try {
        const { institutionId, ratings } = req.body;
        // ratings should be array of { criterionId, score }

        if (!institutionId || !ratings || !Array.isArray(ratings)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide institutionId and ratings array.'
            });
        }

        const db = getFirestore();

        // Verify institution exists
        const institutionDoc = await db.collection('institutions').doc(institutionId).get();
        if (!institutionDoc.exists) {
            return res.status(404).json({
                success: false,
                message: 'Institution not found.'
            });
        }

        // Process each rating
        const results = [];
        const batch = db.batch();

        for (const rating of ratings) {
            const { criterionId, score } = rating;

            // Verify criterion exists
            const criterionDoc = await db.collection('criteria').doc(criterionId).get();
            if (!criterionDoc.exists) {
                continue; // Skip invalid criteria
            }

            const criterion = criterionDoc.data();

            // Validate score
            if (score < 0 || score > criterion.maxScore) {
                continue; // Skip invalid scores
            }

            // Check if rating already exists
            const existingRatingSnapshot = await db.collection('adminRatings')
                .where('institutionId', '==', institutionId)
                .where('criterionId', '==', criterionId)
                .limit(1)
                .get();

            if (!existingRatingSnapshot.empty) {
                // Update existing rating
                const ratingDoc = existingRatingSnapshot.docs[0];
                batch.update(ratingDoc.ref, {
                    nilai: score,
                    updatedAt: new Date()
                });
                results.push({ id: ratingDoc.id, institutionId, criterionId, nilai: score });
            } else {
                // Create new rating
                const newRatingRef = db.collection('adminRatings').doc();
                batch.set(newRatingRef, {
                    institutionId,
                    criterionId,
                    nilai: score,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                results.push({ id: newRatingRef.id, institutionId, criterionId, nilai: score });
            }
        }

        await batch.commit();

        res.json({
            success: true,
            message: 'Admin ratings submitted successfully.',
            data: results
        });
    } catch (error) {
        console.error('Submit admin ratings error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};

// Get admin ratings for institution
export const getAdminRatings = async (req, res) => {
    try {
        const { institutionId } = req.params;

        const db = getFirestore();
        const ratingsSnapshot = await db.collection('adminRatings')
            .where('institutionId', '==', institutionId)
            .get();

        const ratings = await Promise.all(
            ratingsSnapshot.docs.map(async (doc) => {
                const ratingData = doc.data();

                // Get criterion details
                const criterionDoc = await db.collection('criteria').doc(ratingData.criterionId).get();
                const criterion = criterionDoc.exists ? { id: criterionDoc.id, ...criterionDoc.data() } : null;

                return {
                    id: doc.id,
                    ...ratingData,
                    Criterion: criterion
                };
            })
        );

        res.json({
            success: true,
            data: ratings
        });
    } catch (error) {
        console.error('Get admin ratings error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};

// Submit public rating
export const submitPublicRating = async (req, res) => {
    try {
        const { institutionId, rating, comment } = req.body;

        if (!institutionId || !rating) {
            return res.status(400).json({
                success: false,
                message: 'Please provide institutionId and rating.'
            });
        }

        // Validate rating range
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5.'
            });
        }

        const db = getFirestore();

        // Verify institution exists
        const institutionDoc = await db.collection('institutions').doc(institutionId).get();
        if (!institutionDoc.exists) {
            return res.status(404).json({
                success: false,
                message: 'Institution not found.'
            });
        }

        // Get IP address
        const ipAddress = req.ip || req.connection.remoteAddress;

        // Create public rating
        const publicRatingRef = await db.collection('publicRatings').add({
            institutionId,
            rating,
            comment: comment || null,
            ipAddress,
            createdAt: new Date()
        });

        const publicRatingDoc = await publicRatingRef.get();

        res.status(201).json({
            success: true,
            message: 'Rating submitted successfully.',
            data: { id: publicRatingDoc.id, ...publicRatingDoc.data() }
        });
    } catch (error) {
        console.error('Submit public rating error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};

// Get public ratings for institution
export const getPublicRatings = async (req, res) => {
    try {
        const { institutionId } = req.params;

        const db = getFirestore();
        const ratingsSnapshot = await db.collection('publicRatings')
            .where('institutionId', '==', institutionId)
            .orderBy('createdAt', 'desc')
            .get();

        const ratings = ratingsSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                rating: data.rating,
                comment: data.comment,
                createdAt: data.createdAt
            };
        });

        // Calculate average
        const average = ratings.length > 0
            ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
            : null;

        res.json({
            success: true,
            data: {
                ratings,
                average: average ? Math.round(average * 10) / 10 : null,
                count: ratings.length
            }
        });
    } catch (error) {
        console.error('Get public ratings error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};
