import React from 'react';
import Button from '../atoms/Button';

const LembagaTable = ({ data, onEdit, onDelete, onAdd }) => (
    <div>
        <div className="table-container">
            <table className="table">
                <thead><tr><th>No</th><th>Nama Sekolah</th><th>Alamat</th><th>Email</th><th>Aksi</th></tr></thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.nama}</td>
                            <td>{item.alamat}</td>
                            <td>{item.email}</td>
                            <td>
                                <div className="btn-group" style={{ justifyContent: 'flex-start', marginTop: 0 }}>
                                    <Button onClick={() => onEdit(item)} className="btn-edit" title="Edit">✏️</Button>
                                    <Button onClick={() => onDelete(item)} className="btn-delete" title="Hapus">🗑️</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="btn-group" style={{ justifyContent: 'flex-start', marginTop: '20px' }}>
            <Button onClick={onAdd} className="btn-add">Tambah Sekolah</Button>
        </div>
    </div>
);

export default LembagaTable;