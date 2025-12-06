<<<<<<< HEAD
import { getFirestore } from '../config/firebase.js';
=======
import { AdminRating, PublicRating, Institution, Criterion } from '../models/index.js';
>>>>>>> c1fe075 (first)

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

<<<<<<< HEAD
        const db = getFirestore();

        // Verify institution exists
        const institutionDoc = await db.collection('institutions').doc(institutionId).get();
        if (!institutionDoc.exists) {
=======
        // Verify institution exists
        const institution = await Institution.findByPk(institutionId);
        if (!institution) {
>>>>>>> c1fe075 (first)
            return res.status(404).json({
                success: false,
                message: 'Institution not found.'
            });
        }

        // Process each rating
        const results = [];
<<<<<<< HEAD
        const batch = db.batch();

=======
>>>>>>> c1fe075 (first)
        for (const rating of ratings) {
            const { criterionId, score } = rating;

            // Verify criterion exists
<<<<<<< HEAD
            const criterionDoc = await db.collection('criteria').doc(criterionId).get();
            if (!criterionDoc.exists) {
                continue; // Skip invalid criteria
            }

            const criterion = criterionDoc.data();

=======
            const criterion = await Criterion.findByPk(criterionId);
            if (!criterion) {
                continue; // Skip invalid criteria
            }

>>>>>>> c1fe075 (first)
            // Validate score
            if (score < 0 || score > criterion.maxScore) {
                continue; // Skip invalid scores
            }

<<<<<<< HEAD
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

=======
            // Upsert rating (update if exists, create if not)
            const [adminRating, created] = await AdminRating.upsert({
                institutionId,
                criterionId,
                score
            }, {
                returning: true
            });

            results.push(adminRating);
        }

>>>>>>> c1fe075 (first)
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

<<<<<<< HEAD
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
=======
        const ratings = await AdminRating.findAll({
            where: { institutionId },
            include: [Criterion]
        });
>>>>>>> c1fe075 (first)

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

<<<<<<< HEAD
        const db = getFirestore();

        // Verify institution exists
        const institutionDoc = await db.collection('institutions').doc(institutionId).get();
        if (!institutionDoc.exists) {
=======
        // Verify institution exists
        const institution = await Institution.findByPk(institutionId);
        if (!institution) {
>>>>>>> c1fe075 (first)
            return res.status(404).json({
                success: false,
                message: 'Institution not found.'
            });
        }

        // Get IP address
        const ipAddress = req.ip || req.connection.remoteAddress;

        // Create public rating
<<<<<<< HEAD
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
=======
        const publicRating = await PublicRating.create({
            institutionId,
            rating,
            comment: comment || null,
            ipAddress
        });

        res.status(201).json({
            success: true,
            message: 'Rating submitted successfully.',
            data: publicRating
>>>>>>> c1fe075 (first)
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

<<<<<<< HEAD
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
=======
        const ratings = await PublicRating.findAll({
            where: { institutionId },
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'rating', 'comment', 'createdAt']
>>>>>>> c1fe075 (first)
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
