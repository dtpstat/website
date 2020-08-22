import React from 'react';
import { observer } from 'mobx-react';
import './InfoPanel.css';
import { useStore } from '../../models/RootStore';

const InfoPanelObservable = observer(function InfoPanel() {
    const { area } = useStore();
    console.log(area);
    if (!area.id) {
        return null;
    }

    return (
        <div className="info-panel">
            <div className="location">
                <div className="location-title">{area.name || ''}</div>
                <div className="location-description">
                    {area.parentName || ''}
                </div>
            </div>
        </div>
    );
});

export { InfoPanelObservable as InfoPanel };
