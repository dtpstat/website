import React from 'react';
import './FilterPanel.css';
import { observer } from 'mobx-react';
import { useStore } from 'models/RootStore';

export const FilterPanel = observer(function FilterPanel() {
    const { area } = useStore();
    
    if (area.filters.length === 0) {
        return null;
    }

    return (
        <div className="filter-panel">
            {area.filters.map((filter) => {
                return (
                    <div key={filter.name} className="filter-item">
                        <div className="filter-title">{filter.label}</div>
                    </div>
                );
            })}
        </div>
    );
});
