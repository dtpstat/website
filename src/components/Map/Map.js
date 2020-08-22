import React from 'react';
import './Map.css';
import { useStore } from '../../models/RootStore';

export const Map = ({ onChangeArea }) => {
    const map = React.useRef(null);
    const { area } = useStore();

    React.useEffect(() => {
        window.ymaps.ready(() => {
            const _map = new window.ymaps.Map('map', {
                center: [55.76, 37.64],
                zoom: 9,
                controls: [],
            });

            map.current = _map;

            area.fetchArea(_map.getCenter(), _map.getZoom());

            _map.events.add('boundschange', (e) => {
                area.fetchArea(
                    e.originalEvent.newCenter,
                    e.originalEvent.newZoom,
                );
            });
        });
    }, [area]);

    return <div id="map" />;
};
