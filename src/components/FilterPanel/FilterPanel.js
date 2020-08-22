import React from 'react';
import './FilterPanel.css';

export const FilterPanel = () => {
    return <div className="filter-panel">
        <div className="filter-item">
            <div className="filter-title">Период данных</div>
        </div>
        <div className="filter-item">
            <div className="filter-title">Участники ДТП</div>
        </div>
        <div className="filter-item">
            <div className="filter-title">Вред здоровью</div>
        </div>
        <div className="filter-item">
            <div className="filter-title">Фильтры</div>
        </div>
    </div>;
};
