<<<<<<< HEAD
import { getFirestore } from '../config/firebase.js';
=======
import { Criterion } from '../models/index.js';
>>>>>>> c1fe075 (first)

// Get all criteria
export const getAllCriteria = async (req, res) => {
    try {
<<<<<<< HEAD
        const db = getFirestore();
        const criteriaSnapshot = await db.collection('criteria')
            .orderBy('order', 'asc')
            .get();

        const criteria = criteriaSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
=======
        const criteria = await Criterion.findAll({
            order: [['order', 'ASC'], ['id', 'ASC']]
        });
>>>>>>> c1fe075 (first)

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

<<<<<<< HEAD
        const db = getFirestore();
        const criterionRef = await db.collection('criteria').add({
            name,
            maxScore: maxScore || 10,
            bobot: weight || 1.00,  // Using 'bobot' to match existing frontend
            order: order || 0,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const criterionDoc = await criterionRef.get();

        res.status(201).json({
            success: true,
            message: 'Criterion created successfully.',
            data: { id: criterionDoc.id, ...criterionDoc.data() }
=======
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
>>>>>>> c1fe075 (first)
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

<<<<<<< HEAD
        const db = getFirestore();
        const criterionRef = db.collection('criteria').doc(id);
        const criterionDoc = await criterionRef.get();

        if (!criterionDoc.exists) {
=======
        const criterion = await Criterion.findByPk(id);
        if (!criterion) {
>>>>>>> c1fe075 (first)
            return res.status(404).json({
                success: false,
                message: 'Criterion not found.'
            });
        }

<<<<<<< HEAD
        const updateData = {
            updatedAt: new Date()
        };

        if (name !== undefined) updateData.name = name;
        if (maxScore !== undefined) updateData.maxScore = maxScore;
        if (weight !== undefined) updateData.bobot = weight;
        if (order !== undefined) updateData.order = order;

        await criterionRef.update(updateData);

        const updatedDoc = await criterionRef.get();
=======
        await criterion.update({
            name: name || criterion.name,
            maxScore: maxScore !== undefined ? maxScore : criterion.maxScore,
            weight: weight !== undefined ? weight : criterion.weight,
            order: order !== undefined ? order : criterion.order
        });
>>>>>>> c1fe075 (first)

        res.json({
            success: true,
            message: 'Criterion updated successfully.',
<<<<<<< HEAD
            data: { id: updatedDoc.id, ...updatedDoc.data() }
=======
            data: criterion
>>>>>>> c1fe075 (first)
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

<<<<<<< HEAD
        const db = getFirestore();
        const criterionRef = db.collection('criteria').doc(id);
        const criterionDoc = await criterionRef.get();

        if (!criterionDoc.exists) {
=======
        const criterion = await Criterion.findByPk(id);
        if (!criterion) {
>>>>>>> c1fe075 (first)
            return res.status(404).json({
                success: false,
                message: 'Criterion not found.'
            });
        }

<<<<<<< HEAD
        // Delete associated admin ratings
        const adminRatingsSnapshot = await db.collection('adminRatings')
            .where('criterionId', '==', id)
            .get();

        const batch = db.batch();
        adminRatingsSnapshot.docs.forEach(doc => batch.delete(doc.ref));
        batch.delete(criterionRef);

        await batch.commit();
=======
        await criterion.destroy();
>>>>>>> c1fe075 (first)

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
