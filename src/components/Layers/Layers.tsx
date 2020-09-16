import React from 'react';
import LayersFilter from './LayersFilter';
import ZoomSlider from './ZoomSlider';

const Layers = () => {
    return (
        <div className="layers-wrap">
            <button
                className="btn-layers"
                aria-label="Настроить слои отображения"
                style={{ marginBottom: '16px' }}
            >
                <svg className="icon icon-layers">
                    <use xlinkHref="svg/sprite.svg#layers"></use>
                </svg>
            </button>

            <LayersFilter />
            <ZoomSlider />

            <button className="btn-location" aria-label="Мое местоположение">
                <svg className="icon icon-location-arrow">
                    <use xlinkHref="svg/sprite.svg#location-arrow"></use>
                </svg>
            </button>
        </div>
    );
};

export default Layers;
