import React from 'react';

const DashboardTable = ({ data }) => {
    const calculateFinalScore = (item) => {
        // Use adminScore from backend calculation
        return item.adminScore !== null && item.adminScore !== undefined ? item.adminScore : null;
    };

    const sortedData = [...data].sort((a, b) => {
        const scoreA = calculateFinalScore(a);
        const scoreB = calculateFinalScore(b);

        if (scoreA === null && scoreB !== null) return 1;
        if (scoreA !== null && scoreB === null) return -1;
        if (scoreA === null && scoreB === null) return 0;

        return scoreB - scoreA;
    });

    let rankCounter = 0;

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Sekolah</th>
                        <th>Nilai Admin</th>
                        <th>Rating Publik</th>
                        <th>Ranking</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => {
                        const finalScore = calculateFinalScore(item);
                        if (finalScore !== null) {
                            rankCounter++;
                        }
                        return (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.nama}</td>
                                <td>
                                    {finalScore !== null ? finalScore.toFixed(1) : (
                                        <span style={{ fontStyle: 'italic', color: '#888' }}>
                                            (belum dinilai)
                                        </span>
                                    )}
                                </td>
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
                                            (belum ada rating)
                                        </span>
                                    )}
                                </td>
                                <td>{finalScore !== null ? rankCounter : '-'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardTable;