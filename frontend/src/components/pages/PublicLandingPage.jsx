import React, { useState, useEffect } from 'react';
import StarRating from '../atoms/StarRating';
import Button from '../atoms/Button';
import { institutionAPI, ratingAPI } from '../../services/api';
import './PublicLandingPage.css';

const PublicLandingPage = ({ setPage }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await institutionAPI.getAll();
            if (response.success) {
                setData(response.data);
            }
        } catch (error) {
            console.error('Error fetching institutions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRateClick = (institution) => {
        setSelectedInstitution(institution);
        setRating(0);
        setComment('');
    };

    const handleSubmitRating = async () => {
        if (rating === 0) {
            alert('Silakan pilih rating terlebih dahulu');
            return;
        }

        try {
            setSubmitting(true);
            await ratingAPI.submitPublicRating(selectedInstitution.id, rating, comment);
            alert('Rating berhasil dikirim!');
            setSelectedInstitution(null);
            setRating(0);
            setComment('');
            await fetchData();
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Gagal mengirim rating. Silakan coba lagi.');
        } finally {
            setSubmitting(false);
        }
    };

    const filteredData = data.filter(item =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="landing-page">
            {/* Hero Section - Compact */}
            <section className="hero-section-compact">
                <div className="hero-background">
                    <div className="hero-shape hero-shape-1"></div>
                    <div className="hero-shape hero-shape-2"></div>
                    <div className="hero-shape hero-shape-3"></div>
                </div>
                <div className="hero-content-compact">
                    <h1 className="hero-title-compact">
                        Sistem Penilaian <span className="text-highlight">Sekolah</span>
                    </h1>
                    <p className="hero-subtitle-compact">
                        Berikan penilaian Anda untuk membantu meningkatkan kualitas lembaga pendidikan
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="main-content-section">
                <div className="content-container">
                    <h2 className="content-title">Daftar Sekolah</h2>

                    {/* Search Bar */}
                    <div className="search-box-main">
                        <span className="search-icon-main">🔍</span>
                        <input
                            type="text"
                            placeholder="Cari lembaga..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input-main"
                        />
                    </div>

                    {/* Institutions Grid */}
                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Memuat data...</p>
                        </div>
                    ) : filteredData.length === 0 ? (
                        <div className="empty-state">
                            <p>Tidak ada sekolah yang ditemukan</p>
                        </div>
                    ) : (
                        <div className="schools-grid">
                            {filteredData.map((institution) => (
                                <div key={institution.id} className="school-card">
                                    <div className="school-card-header">
                                        <div className="school-icon">🏫</div>
                                        <h3 className="school-name">{institution.nama}</h3>
                                    </div>
                                    <div className="school-card-body">
                                        <div className="school-info-item">
                                            <span className="info-icon-pin">📍</span>
                                            <span className="info-text-small">{institution.alamat}</span>
                                        </div>
                                        <div className="school-info-item">
                                            <span className="info-icon-pin">✉️</span>
                                            <span className="info-text-small">{institution.email}</span>
                                        </div>

                                        <div className="rating-section-card">
                                            {institution.publicScore !== null ? (
                                                <>
                                                    <div className="stars-display">
                                                        <StarRating rating={institution.publicScore} readonly={true} />
                                                    </div>
                                                    <div className="rating-number-display">
                                                        <span className="rating-value">{institution.publicScore.toFixed(1)}</span>
                                                        <span className="rating-count-text">({institution.publicRatingCount} rating)</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="no-rating-yet">
                                                    <span>Belum ada rating</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="school-card-footer">
                                        <button
                                            className="btn-rate-school"
                                            onClick={() => handleRateClick(institution)}
                                        >
                                            ⭐ Beri Rating
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Rating Modal */}
            {selectedInstitution && (
                <div className="modal-overlay-landing" onClick={() => setSelectedInstitution(null)}>
                    <div className="modal-content-landing" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedInstitution(null)}>
                            ✕
                        </button>
                        <div className="modal-header">
                            <div className="modal-icon">⭐</div>
                            <h2 className="modal-title">Beri Rating</h2>
                            <h3 className="modal-subtitle">{selectedInstitution.nama}</h3>
                        </div>
                        <div className="modal-body">
                            <div className="rating-section">
                                <label className="rating-label">Rating Anda:</label>
                                <div className="rating-stars-large">
                                    <StarRating rating={rating} onRate={setRating} />
                                </div>
                                {rating > 0 && (
                                    <div className="rating-text">
                                        {rating === 1 && '😞 Sangat Kurang'}
                                        {rating === 2 && '😐 Kurang'}
                                        {rating === 3 && '😊 Cukup'}
                                        {rating === 4 && '😄 Baik'}
                                        {rating === 5 && '🤩 Sangat Baik'}
                                    </div>
                                )}
                            </div>
                            <div className="comment-section">
                                <label className="comment-label">Komentar (Opsional):</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Tulis komentar Anda..."
                                    className="comment-textarea"
                                    rows="4"
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn-modal-cancel"
                                onClick={() => setSelectedInstitution(null)}
                                disabled={submitting}
                            >
                                Batal
                            </button>
                            <button
                                className="btn-modal-submit"
                                onClick={handleSubmitRating}
                                disabled={submitting || rating === 0}
                            >
                                {submitting ? 'Mengirim...' : 'Kirim Rating'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-content">
                    <p>© 2025 Sistem Penilaian Sekolah. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default PublicLandingPage;
