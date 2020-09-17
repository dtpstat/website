import React from 'react';
import SvgIcon from '../SvgIcon'

const EventHeader = () => {
    return (
        <div className="event-header">
            <button className="btn-gallery" style={{marginRight: '32px'}}>
                <span className="gallery-count">
                    <SvgIcon name="photo"/>
                    6 фото
                </span>
            </button>
            <div style={{width: '100%'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <button className="btn-viewmap">
                        <SvgIcon name="map"/>
                        <span className="caption">Перейти на карту</span>
                    </button>
                    <label className="viewSwitch">
                        <input type="checkbox" />
                        <span className="viewSwitch-slider"></span>
                    </label>
                </div>

            </div>
        </div>
    );
};

export default EventHeader;
