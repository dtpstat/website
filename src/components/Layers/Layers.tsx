import React from 'react';
import LayersFilter from './LayersFilter';
import ZoomSlider from './ZoomSlider';
import SvgIcon from '../SvgIcon';

const Layers = () => {
    return (
        <div className="layers-wrap">
            <button
                className="btn-layers"
                aria-label="Настроить слои отображения"
                style={{ marginBottom: '16px' }}
            >
                <SvgIcon name="layers"/>
            </button>

            <LayersFilter />
            <ZoomSlider />

            <button className="btn-location" aria-label="Мое местоположение">
                <SvgIcon name="location-arrow"/>
            </button>
        </div>
    );
};

export default Layers;
