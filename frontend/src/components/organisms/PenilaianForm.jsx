import React, { useState, useEffect } from 'react';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';

const PenilaianForm = ({ item, criteria, onSave, onCancel }) => {
    const [scores, setScores] = useState({});

    useEffect(() => {
        // Initialize scores from existing ratings or set to 0
        const initialScores = {};
        if (criteria && criteria.length > 0) {
            criteria.forEach(criterion => {
                // Find existing rating for this criterion
                const existingRating = item.AdminRatings?.find(
                    rating => rating.criterionId === criterion.id
                );
                initialScores[criterion.id] = existingRating ? existingRating.score : 0;
            });
        }
        setScores(initialScores);
    }, [criteria, item]);

    const handleChange = (criterionId, maxScore) => (e) => {
        const value = e.target.value;
        const numValue = Math.min(maxScore, Math.max(0, Number(value)));
        setScores(prev => ({ ...prev, [criterionId]: numValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert scores object to ratings array
        const ratings = Object.entries(scores).map(([criterionId, score]) => ({
            criterionId: parseInt(criterionId),
            score: parseFloat(score)
        }));

        onSave({
            institutionId: item.id,
            ratings
        });
    };

    if (!criteria || criteria.length === 0) {
        return (
            <div className="form-container">
                <h2>Edit Penilaian</h2>
                <p style={{ color: '#888', marginTop: '20px' }}>
                    Belum ada kriteria penilaian. Silakan tambahkan kriteria terlebih dahulu.
                </p>
                <Button type="button" onClick={onCancel} className="btn-cancel">
                    Kembali
                </Button>
            </div>
        );
    }

    return (
        <div className="form-container">
            <h2 style={{ marginBottom: '20px' }}>Edit Penilaian</h2>
            <h3 style={{ marginBottom: '30px', color: '#555' }}>{item.nama}</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    {criteria.map(criterion => (
                        <div className="form-col" key={criterion.id}>
                            <InputField
                                label={`${criterion.name} (Max: ${criterion.maxScore})`}
                                type="number"
                                name={`criterion-${criterion.id}`}
                                value={scores[criterion.id] || 0}
                                onChange={handleChange(criterion.id, criterion.maxScore)}
                                required
                                min="0"
                                max={criterion.maxScore}
                                step="0.1"
                            />
                        </div>
                    ))}
                </div>
                <div className="btn-group">
                    <Button type="button" onClick={onCancel} className="btn-cancel">Batal</Button>
                    <Button type="submit" className="btn-add">Simpan Nilai</Button>
                </div>
            </form>
        </div>
    );
};

export default PenilaianForm;