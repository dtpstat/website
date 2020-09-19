import React from 'react';
import EventHeader from './EventHeader';
import EventTags from './EventTags';
import EventMembers from './EventMembers';

const Event = () => {
    return (
        <div className="event-layer">
            <div className="container">
                <EventHeader />
                <EventTags />
                <h1 className="h1" style={{ marginBottom: '10px' }}>
                    Участники ДТП
                </h1>
                <EventMembers />
            </div>
        </div>
    );
};

export default Event;
