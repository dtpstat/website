import React from 'react';
import EventHeader from './EventHeader';
import EventTags from './EventTags';
import EventMembers from './EventMembers';
import SvgIcon from '../SvgIcon';
import { Colors } from 'components/ui/Colors';
import EventComments from './EventComments';
import NewsItem from '../News/NewsItem';
import Footer from '../Footer/Footer';

const Event = () => {
    return (
        <div className="event-layer">
            <div className="container">
                <EventHeader />
                <EventTags />
                <h2 className="h2" style={{ marginBottom: '12px' }}>
                    Участники ДТП
                </h2>
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
                <h2 className="h2" style={{ marginBottom: '8px' }}>
                    Новости по теме
                </h2>
                <div className="news-container" style={{ margin: '0 -10px 14px -10px ' }}>
                    <NewsItem
                        size="small"
                        title="Велополоса на Лесной улице"
                        img="https://img.thedailybeast.com/image/upload/v1531451526/180712-Weill--The-Creator-of-Pepe-hero_uionjj.jpg"
                        link="#"
                    />
                    <NewsItem
                        size="small"
                        title="Белгород выбирает наземный переход"
                        img="https://img.thedailybeast.com/image/upload/v1531451526/180712-Weill--The-Creator-of-Pepe-hero_uionjj.jpg"
                        link="#"
                    />
                    <NewsItem
                        size="small"
                        title="Как депутат из Академии запустил проект по мониторингу воздуха"
                        img="https://img.thedailybeast.com/image/upload/v1531451526/180712-Weill--The-Creator-of-Pepe-hero_uionjj.jpg"
                        link="#"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Event;
