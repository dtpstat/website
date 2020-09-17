import React from 'react';
import SvgIcon from '../SvgIcon'

const EventHeader = () => {
    return (
        <div className="event-header">
            <button className="btn-gallery">
                <span className="galley-count">
                    <SvgIcon name="photo"/>
                </span>
            </button>
        </div>
    );
};

export default EventHeader;
