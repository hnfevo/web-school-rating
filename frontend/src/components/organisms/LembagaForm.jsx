import React, { useState } from 'react';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';

const LembagaForm = ({ item, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
        item || { nama: '', alamat: '', email: '' }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="form-container">
            <h2 style={{ marginBottom: '30px' }}>{item ? 'Edit Data Sekolah' : 'Tambah Sekolah Baru'}</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Nama Sekolah"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Alamat"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <div className="btn-group">
                    <Button type="button" onClick={onCancel} className="btn-cancel">Batal</Button>
                    <Button type="submit" className="btn-add">{item ? 'Simpan' : 'Tambah'}</Button>
                </div>
            </form>
        </div>
    );
};

export default LembagaForm;