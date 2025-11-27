import { Criterion } from '../models/index.js';

// Get all criteria
export const getAllCriteria = async (req, res) => {
    try {
        const criteria = await Criterion.findAll({
            order: [['order', 'ASC'], ['id', 'ASC']]
        });

        res.json({
            success: true,
            data: criteria
        });
    } catch (error) {
        console.error('Get all criteria error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};

// Create criterion (admin only)
export const createCriterion = async (req, res) => {
    try {
        const { name, maxScore, weight, order } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Please provide criterion name.'
            });
        }

        const criterion = await Criterion.create({
            name,
            maxScore: maxScore || 10,
            weight: weight || 1.00,
            order: order || 0
        });

        res.status(201).json({
            success: true,
            message: 'Criterion created successfully.',
            data: criterion
        });
    } catch (error) {
        console.error('Create criterion error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};

// Update criterion (admin only)
export const updateCriterion = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, maxScore, weight, order } = req.body;

        const criterion = await Criterion.findByPk(id);
        if (!criterion) {
            return res.status(404).json({
                success: false,
                message: 'Criterion not found.'
            });
        }

        await criterion.update({
            name: name || criterion.name,
            maxScore: maxScore !== undefined ? maxScore : criterion.maxScore,
            weight: weight !== undefined ? weight : criterion.weight,
            order: order !== undefined ? order : criterion.order
        });

        res.json({
            success: true,
            message: 'Criterion updated successfully.',
            data: criterion
        });
    } catch (error) {
        console.error('Update criterion error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};

// Delete criterion (admin only)
export const deleteCriterion = async (req, res) => {
    try {
        const { id } = req.params;

        const criterion = await Criterion.findByPk(id);
        if (!criterion) {
            return res.status(404).json({
                success: false,
                message: 'Criterion not found.'
            });
        }

        await criterion.destroy();

        res.json({
            success: true,
            message: 'Criterion deleted successfully.'
        });
    } catch (error) {
        console.error('Delete criterion error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};
