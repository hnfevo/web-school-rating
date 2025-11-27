import { Institution, AdminRating, PublicRating, Criterion } from '../models/index.js';
import { Op } from 'sequelize';

// Get all institutions with ratings
export const getAllInstitutions = async (req, res) => {
    try {
        const institutions = await Institution.findAll({
            include: [
                {
                    model: AdminRating,
                    include: [Criterion]
                },
                {
                    model: PublicRating
                }
            ],
            order: [['nama', 'ASC']]
        });

        // Calculate scores for each institution
        const institutionsWithScores = institutions.map(inst => {
            const instData = inst.toJSON();

            // Calculate admin score (weighted average)
            let adminScore = null;
            if (instData.AdminRatings && instData.AdminRatings.length > 0) {
                let totalWeightedScore = 0;
                let totalWeight = 0;

                instData.AdminRatings.forEach(rating => {
                    // CRITICAL FIX: Convert weight to number (database returns it as string)
                    const weight = parseFloat(rating.Criterion.weight) || 1;
                    totalWeightedScore += rating.score * weight;
                    totalWeight += weight;
                });

                adminScore = totalWeight > 0 ? (totalWeightedScore / totalWeight) : null;
            }

            // Calculate public score (average)
            let publicScore = null;
            let publicCount = 0;
            if (instData.PublicRatings && instData.PublicRatings.length > 0) {
                const sum = instData.PublicRatings.reduce((acc, rating) => acc + rating.rating, 0);
                publicScore = sum / instData.PublicRatings.length;
                publicCount = instData.PublicRatings.length;
            }

            return {
                ...instData,
                adminScore: adminScore ? Math.round(adminScore * 10) / 10 : null,
                publicScore: publicScore ? Math.round(publicScore * 10) / 10 : null,
                publicRatingCount: publicCount
            };
        });

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

        const institution = await Institution.findByPk(id, {
            include: [
                {
                    model: AdminRating,
                    include: [Criterion]
                },
                {
                    model: PublicRating
                }
            ]
        });

        if (!institution) {
            return res.status(404).json({
                success: false,
                message: 'Institution not found.'
            });
        }

        res.json({
            success: true,
            data: institution
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

        const institution = await Institution.create({
            nama,
            alamat,
            email
        });

        res.status(201).json({
            success: true,
            message: 'Institution created successfully.',
            data: institution
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

        const institution = await Institution.findByPk(id);
        if (!institution) {
            return res.status(404).json({
                success: false,
                message: 'Institution not found.'
            });
        }

        await institution.update({
            nama: nama || institution.nama,
            alamat: alamat || institution.alamat,
            email: email || institution.email
        });

        res.json({
            success: true,
            message: 'Institution updated successfully.',
            data: institution
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

        const institution = await Institution.findByPk(id);
        if (!institution) {
            return res.status(404).json({
                success: false,
                message: 'Institution not found.'
            });
        }

        await institution.destroy();

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
