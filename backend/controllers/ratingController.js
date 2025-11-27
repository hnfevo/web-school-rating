import { AdminRating, PublicRating, Institution, Criterion } from '../models/index.js';

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

        // Verify institution exists
        const institution = await Institution.findByPk(institutionId);
        if (!institution) {
            return res.status(404).json({
                success: false,
                message: 'Institution not found.'
            });
        }

        // Process each rating
        const results = [];
        for (const rating of ratings) {
            const { criterionId, score } = rating;

            // Verify criterion exists
            const criterion = await Criterion.findByPk(criterionId);
            if (!criterion) {
                continue; // Skip invalid criteria
            }

            // Validate score
            if (score < 0 || score > criterion.maxScore) {
                continue; // Skip invalid scores
            }

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

        const ratings = await AdminRating.findAll({
            where: { institutionId },
            include: [Criterion]
        });

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

        // Verify institution exists
        const institution = await Institution.findByPk(institutionId);
        if (!institution) {
            return res.status(404).json({
                success: false,
                message: 'Institution not found.'
            });
        }

        // Get IP address
        const ipAddress = req.ip || req.connection.remoteAddress;

        // Create public rating
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

        const ratings = await PublicRating.findAll({
            where: { institutionId },
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'rating', 'comment', 'createdAt']
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
