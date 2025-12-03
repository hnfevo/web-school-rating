import { getFirestore } from '../config/firebase.js';

// Get all criteria
export const getAllCriteria = async (req, res) => {
    try {
        const db = getFirestore();
        const criteriaSnapshot = await db.collection('criteria')
            .orderBy('order', 'asc')
            .get();

        const criteria = criteriaSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

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

        const db = getFirestore();
        const criterionRef = db.collection('criteria').doc(id);
        const criterionDoc = await criterionRef.get();

        if (!criterionDoc.exists) {
            return res.status(404).json({
                success: false,
                message: 'Criterion not found.'
            });
        }

        const updateData = {
            updatedAt: new Date()
        };

        if (name !== undefined) updateData.name = name;
        if (maxScore !== undefined) updateData.maxScore = maxScore;
        if (weight !== undefined) updateData.bobot = weight;
        if (order !== undefined) updateData.order = order;

        await criterionRef.update(updateData);

        const updatedDoc = await criterionRef.get();

        res.json({
            success: true,
            message: 'Criterion updated successfully.',
            data: { id: updatedDoc.id, ...updatedDoc.data() }
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

        const db = getFirestore();
        const criterionRef = db.collection('criteria').doc(id);
        const criterionDoc = await criterionRef.get();

        if (!criterionDoc.exists) {
            return res.status(404).json({
                success: false,
                message: 'Criterion not found.'
            });
        }

        // Delete associated admin ratings
        const adminRatingsSnapshot = await db.collection('adminRatings')
            .where('criterionId', '==', id)
            .get();

        const batch = db.batch();
        adminRatingsSnapshot.docs.forEach(doc => batch.delete(doc.ref));
        batch.delete(criterionRef);

        await batch.commit();

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
