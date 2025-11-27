import React, { useState, useEffect, useMemo } from 'react';
import DashboardTemplate from '../templates/DashboardTemplate';
import DashboardTable from '../organisms/DashboardTable';
import StarRating from '../atoms/StarRating';
import Button from '../atoms/Button';
import { institutionAPI, ratingAPI } from '../../services/api';

const PublicDashboardPage = ({ setPage }) => {
    const [activeContent, setActiveContent] = useState('dashboard');
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const handleResize = () => setSidebarVisible(window.innerWidth > 768);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const filteredData = useMemo(() => {
        if (!searchQuery) return data;
        return data.filter(item =>
            item.nama.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data, searchQuery]);

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
            await fetchData(); // Refresh data
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Gagal mengirim rating. Silakan coba lagi.');
        } finally {
            setSubmitting(false);
        }
    };

    const renderContent = () => {
        if (loading) {
            return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
        }

        if (selectedInstitution) {
            return (
                <div className="form-container">
                    <h2 style={{ marginBottom: '20px' }}>Beri Rating</h2>
                    <h3 style={{ marginBottom: '30px', color: '#555' }}>{selectedInstitution.nama}</h3>

                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
                            Rating Anda:
                        </label>
                        <StarRating rating={rating} onRate={setRating} />
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
                            Komentar (Opsional):
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Tulis komentar Anda..."
                            style={{
                                width: '100%',
                                minHeight: '100px',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontFamily: 'inherit',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    <div className="btn-group">
                        <Button
                            type="button"
                            onClick={() => setSelectedInstitution(null)}
                            className="btn-cancel"
                            disabled={submitting}
                        >
                            Batal
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSubmitRating}
                            className="btn-add"
                            disabled={submitting}
                        >
                            {submitting ? 'Mengirim...' : 'Kirim Rating'}
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Daftar Sekolah</h2>
                    <Button onClick={() => setPage('login')} className="btn-add">
                        Login Admin
                    </Button>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Sekolah</th>
                                <th>Alamat</th>
                                <th>Rating Publik</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.alamat}</td>
                                    <td>
                                        {item.publicScore !== null ? (
                                            <>
                                                ⭐ {item.publicScore.toFixed(1)}
                                                <span style={{ fontSize: '0.85em', color: '#888' }}>
                                                    {' '}({item.publicRatingCount} rating)
                                                </span>
                                            </>
                                        ) : (
                                            <span style={{ fontStyle: 'italic', color: '#888' }}>
                                                Belum ada rating
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            onClick={() => handleRateClick(item)}
                                            className="btn-add"
                                            style={{ padding: '6px 12px', fontSize: '13px' }}
                                        >
                                            Beri Rating
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <>
            <DashboardTemplate
                activeContent={activeContent}
                setActiveContent={setActiveContent}
                isSidebarVisible={isSidebarVisible}
                toggleSidebar={() => setSidebarVisible(!isSidebarVisible)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isPublic={true}
            >
                {renderContent()}
            </DashboardTemplate>
        </>
    );
};

export default PublicDashboardPage;