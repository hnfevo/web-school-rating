import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import { criterionAPI } from '../../services/api';

const PenilaianTable = ({ data, onEdit }) => {
    const [criteria, setCriteria] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCriteria();
    }, []);

    const fetchCriteria = async () => {
        try {
            const response = await criterionAPI.getAll();
            if (response.success) {
                setCriteria(response.data);
            }
        } catch (error) {
            console.error('Error fetching criteria:', error);
        } finally {
            setLoading(false);
        }
    };

    const getScoreForCriterion = (item, criterionId) => {
        const rating = item.AdminRatings?.find(r => r.criterionId === criterionId);
        return rating ? rating.score : null;
    };

    const calculateWeightedTotal = (item) => {
        if (!item.AdminRatings || item.AdminRatings.length === 0 || criteria.length === 0) {
            return null;
        }

        let totalWeightedScore = 0;
        let totalWeight = 0;

        item.AdminRatings.forEach(rating => {
            const criterion = criteria.find(c => c.id === rating.criterionId);
            if (criterion) {
<<<<<<< HEAD
=======
                // CRITICAL FIX: Convert weight to number (database returns it as string)
>>>>>>> c1fe075 (first)
                const weight = parseFloat(criterion.weight) || 1;
                totalWeightedScore += rating.score * weight;
                totalWeight += weight;
            }
        });

        return totalWeight > 0 ? (totalWeightedScore / totalWeight).toFixed(1) : null;
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
    }

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
<<<<<<< HEAD
                        <th>Nama Sekolah</th>
=======
                        <th>Nama Lembaga</th>
>>>>>>> c1fe075 (first)
                        {criteria.map(criterion => (
                            <th key={criterion.id}>{criterion.name}</th>
                        ))}
                        <th>Nilai Akhir</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        const hasScore = item.AdminRatings && item.AdminRatings.length > 0;
                        const finalScore = calculateWeightedTotal(item);

                        return (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.nama}</td>
                                {hasScore ? (
                                    <>
                                        {criteria.map(criterion => {
                                            const score = getScoreForCriterion(item, criterion.id);
                                            return (
                                                <td key={criterion.id}>
                                                    {score !== null ? score : '-'}
                                                </td>
                                            );
                                        })}
                                        <td><strong>{finalScore}</strong></td>
                                    </>
                                ) : (
                                    <td colSpan={criteria.length + 1} style={{ textAlign: 'center', fontStyle: 'italic', color: '#888' }}>
                                        (belum dilakukan penilaian/sedang ditinjau)
                                    </td>
                                )}
                                <td>
<<<<<<< HEAD
                                    <Button onClick={() => onEdit(item)} className="btn-edit" title={hasScore ? 'Edit Nilai' : 'Lakukan Penilaian'}>
                                        {hasScore ? '✏️' : '📝'}
=======
                                    <Button onClick={() => onEdit(item)} className="btn-edit">
                                        {hasScore ? 'Edit Nilai' : 'Lakukan Penilaian'}
>>>>>>> c1fe075 (first)
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default PenilaianTable;