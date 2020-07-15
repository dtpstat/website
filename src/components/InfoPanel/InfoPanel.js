import * as React from 'react';
import './InfoPanel.css';

export const InfoPanel = ({ area }) => {
    if (!area || !area.region_name) {
        return null;
    }

    return (
        <div className="info-panel">
            <div className="location">
                <div className="location-title">{area.region_name || ''}</div>
                {/* <div className="location-description">Восточное Измайлово</div> */}
            </div>
        </div>
    );
};
