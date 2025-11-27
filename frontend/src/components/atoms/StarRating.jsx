import React, { useState } from 'react';

const StarRating = ({ rating, onRate, readonly = false }) => {
    const [hover, setHover] = useState(0);
    const totalStars = 5;

    const starStyle = (index) => ({
        fontSize: '28px',
        cursor: readonly ? 'default' : 'pointer',
        color: (hover || rating) >= index ? '#FFD700' : '#D8D8D8',
        margin: '0 2px',
        transition: 'color 0.2s'
    });

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <span
                        key={index}
                        style={starStyle(starValue)}
                        onClick={() => !readonly && onRate && onRate(starValue)}
                        onMouseEnter={() => !readonly && setHover(starValue)}
                        onMouseLeave={() => !readonly && setHover(0)}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;