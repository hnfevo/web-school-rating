import React from 'react';
import StarRating from '../atoms/StarRating'; // <-- Import StarRating

const DashboardTable = ({ data }) => {
    const calculateFinalScore = (item) => {
        if (item.nilai1 === null || item.nilai2 === null || item.nilai3 === null) {
            return null;
        }
        // Menghitung skor 0-100
        return Math.round(((item.nilai1 + item.nilai2 + item.nilai3) / 3) * 10);
    };

    // Logika pengurutan tetap dipertahankan untuk menyusun ranking secara benar
    const sortedData = [...data].sort((a, b) => {
        const scoreA = calculateFinalScore(a);
        const scoreB = calculateFinalScore(b);

        // Lembaga tanpa nilai diletakkan di bawah
        if (scoreA === null && scoreB !== null) return 1;
        if (scoreA !== null && scoreB === null) return -1;
        if (scoreA === null && scoreB === null) return 0;

        return scoreB - scoreA;
    });

    // Hapus rankCounter karena ranking tidak ditampilkan sebagai angka

    return (
        <div className="table-container">
            <table className="table">
                {/* Hapus kolom Nilai dan Ranking */}
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Sekolah</th>
                        <th style={{ width: '300px' }}>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => {
                        const finalScore = calculateFinalScore(item);
                        return (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.nama}</td>
                                <td>
                                    {/* Tampilkan StarRating jika ada nilai, jika tidak tampilkan pesan */}
                                    {finalScore !== null ? (
                                        <StarRating finalScore={finalScore} />
                                    ) : (
                                        <span style={{ fontStyle: 'italic', color: '#888' }}>
                                            (belum dilakukan penilaian/sedang ditinjau)
                                        </span>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardTable;