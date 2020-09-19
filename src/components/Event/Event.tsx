import React from 'react';
import EventHeader from './EventHeader';
import EventTags from './EventTags';
import EventMembers from './EventMembers';
import SvgIcon from '../SvgIcon';
import { Colors } from 'components/ui/Colors';
import EventComments from './EventComments';

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
                <div className="dtp-info">
                    <img src="svg/gibdd.svg" alt="Лого ГИБДД"></img>
                    <p className="subtitle1">Официальные данные ГИБДД</p>
                    <button className="btn-light" style={{ flexShrink: 0 }}>
                        <SvgIcon name="warning" color={Colors.$grey70} />
                        <span>Нашли ошибку?</span>
                    </button>
                </div>
                <EventComments />
            </div>
        </div>
    );
};

export default Event;
