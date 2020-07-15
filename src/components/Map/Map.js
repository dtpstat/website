import * as React from 'react';
import './Map.css';

export const Map = ({ onChangeArea }) => {
    const map = React.useRef(null);

    const fetchStatistics = React.useCallback(
        (center, zoom) => {
            fetch(
                `http://beta.dtp-stat.ru/api/stat/?center_point=${center[1]}+${center[0]}&scale=${zoom}`,
            )
                .then((response) => response.json())
                .then((response) => onChangeArea(response))
                .catch((error) => console.warn(error));
        },
        [onChangeArea],
    );

    React.useEffect(() => {
        window.ymaps.ready(() => {
            const _map = new window.ymaps.Map('map', {
                center: [55.76, 37.64],
                zoom: 9,
                controls: [],
            });

            map.current = _map;

            fetchStatistics(_map.getCenter(), _map.getZoom());

            _map.events.add('boundschange', (e) => {
                fetchStatistics(
                    e.originalEvent.newCenter,
                    e.originalEvent.newZoom,
                );
            });
        });
    }, [fetchStatistics]);

    return <div id="map" />;
};
