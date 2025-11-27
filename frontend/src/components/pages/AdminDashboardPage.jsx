import React, { useState, useEffect, useMemo } from 'react';
import DashboardTemplate from '../templates/DashboardTemplate';
import DeleteModal from '../molecules/DeleteModal';
import DashboardTable from '../organisms/DashboardTable';
import LembagaTable from '../organisms/LembagaTable';
import PenilaianTable from '../organisms/PenilaianTable';
import LembagaForm from '../organisms/LembagaForm';
import PenilaianForm from '../organisms/PenilaianForm';
import { institutionAPI, criterionAPI, ratingAPI } from '../../services/api';

const AdminDashboardPage = ({ onLogout }) => {
    const [activeContent, setActiveContent] = useState('dashboard');
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [criteria, setCriteria] = useState([]);
    const [loading, setLoading] = useState(true);

    const [view, setView] = useState('table');
    const [currentItem, setCurrentItem] = useState(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

    useEffect(() => {
        const handleResize = () => setSidebarVisible(window.innerWidth > 768);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch data on mount
    useEffect(() => {
        fetchData();
        fetchCriteria();
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
            alert('Failed to load institutions');
        } finally {
            setLoading(false);
        }
    };

    const fetchCriteria = async () => {
        try {
            const response = await criterionAPI.getAll();
            if (response.success) {
                setCriteria(response.data);
            }
        } catch (error) {
            console.error('Error fetching criteria:', error);
        }
    };

    // Logika Filtering
    const filteredData = useMemo(() => {
        if (!searchQuery) return data;
        return data.filter(item =>
            item.nama.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data, searchQuery]);

    // Logika CRUD Lembaga
    const handleSaveLembaga = async (formData) => {
        try {
            if (formData.id) {
                await institutionAPI.update(formData.id, formData);
            } else {
                await institutionAPI.create(formData);
            }
            await fetchData();
            setView('table');
            setCurrentItem(null);
        } catch (error) {
            console.error('Error saving institution:', error);
            alert('Failed to save institution');
        }
    };

    const handleDelete = async () => {
        try {
            await institutionAPI.delete(currentItem.id);
            await fetchData();
            setDeleteModalVisible(false);
            setCurrentItem(null);
        } catch (error) {
            console.error('Error deleting institution:', error);
            alert('Failed to delete institution');
        }
    };

    // Logika CRUD Penilaian
    const handleSavePenilaian = async (formData) => {
        try {
            // formData should contain institutionId and ratings array
            await ratingAPI.submitAdminRatings(formData.institutionId, formData.ratings);
            await fetchData();
            setView('table');
            setCurrentItem(null);
        } catch (error) {
            console.error('Error saving ratings:', error);
            alert('Failed to save ratings');
        }
    };

    const resetFormView = () => {
        setView('table');
        setCurrentItem(null);
    }

    const renderContent = () => {
        if (loading) {
            return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
        }

        if (view === 'lembagaForm') {
            return <LembagaForm item={currentItem} onSave={handleSaveLembaga} onCancel={resetFormView} />;
        }
        if (view === 'penilaianForm') {
            return <PenilaianForm item={currentItem} criteria={criteria} onSave={handleSavePenilaian} onCancel={resetFormView} />;
        }

        switch (activeContent) {
            case 'dashboard':
                return <DashboardTable data={filteredData} />;
            case 'lembaga':
                return (
                    <LembagaTable
                        data={filteredData}
                        onAdd={() => { setCurrentItem(null); setView('lembagaForm'); }}
                        onEdit={(item) => { setCurrentItem(item); setView('lembagaForm'); }}
                        onDelete={(item) => { setCurrentItem(item); setDeleteModalVisible(true); }}
                    />
                );
            case 'penilaian':
                return (
                    <PenilaianTable
                        data={filteredData}
                        onEdit={(item) => { setCurrentItem(item); setView('penilaianForm'); }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            {isDeleteModalVisible && <DeleteModal onConfirm={handleDelete} onCancel={() => setDeleteModalVisible(false)} />}
            <DashboardTemplate
                activeContent={activeContent}
                setActiveContent={setActiveContent}
                onLogout={onLogout}
                isSidebarVisible={isSidebarVisible}
                toggleSidebar={() => setSidebarVisible(!isSidebarVisible)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                view={view}
            >
                {renderContent()}
            </DashboardTemplate>
        </>
    );
};

export default AdminDashboardPage;