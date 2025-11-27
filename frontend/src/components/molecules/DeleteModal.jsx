import React from 'react';
import Button from '../atoms/Button';

const DeleteModal = ({ onConfirm, onCancel }) => (
    <div className="modal-overlay">
        <div className="modal-content">
            <h3>Konfirmasi Hapus</h3>
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="btn-group" style={{ justifyContent: 'center' }}>
                <Button onClick={onCancel} className="btn-cancel">Batal</Button>
                <Button onClick={onConfirm} className="btn-delete">Hapus</Button>
            </div>
        </div>
    </div>
);

export default DeleteModal;