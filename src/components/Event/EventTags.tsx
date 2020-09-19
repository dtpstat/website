import React from 'react';

const EventTags = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                maxHeight: '88px',
                overflow: 'hidden',
                marginBottom: '20px',
            }}
        >
            <div className="category-tag" tabIndex={0} style={{ marginBottom: '6px' }}>
                <button className="btn-rect">
                    <span>Ясно</span>
                </button>
            </div>
            <div className="category-tag" tabIndex={0} style={{ marginBottom: '6px' }}>
                <button className="btn-rect">
                    <span>Светлое время суток</span>
                </button>
            </div>
            <div className="category-tag" tabIndex={0} style={{ marginBottom: '6px' }}>
                <button className="btn-rect">
                    <span>Покрытие — сухое</span>
                </button>
            </div>
            <div className="category-tag" tabIndex={0} style={{ marginBottom: '6px' }}>
                <button className="btn-rect">
                    <span>Многоквартирные жилые дома</span>
                </button>
            </div>
            <div className="category-tag" tabIndex={0} style={{ marginBottom: '6px' }}>
                <button className="btn-rect">
                    <span>Нерегулируемый пешеходный переход</span>
                </button>
            </div>
            <div className="category-tag" tabIndex={0} style={{ marginBottom: '6px' }}>
                <button className="btn-rect">
                    <span>Выезд с прилегающей территории</span>
                </button>
            </div>
            <div className="category-tag-middle" tabIndex={0} style={{ marginBottom: '6px' }}>
                <button className="btn-rect">
                    <span>Ещё 5 тегов...</span>
                </button>
            </div>
        </div>
    );
};

export default EventTags;
