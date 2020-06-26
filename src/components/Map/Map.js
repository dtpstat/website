import * as React from 'react';
import './Map.css';

export const Map = () => {
    const map = React.useRef(null);
    React.useEffect(() => {
        window.ymaps.ready(() => {
            map.current = new window.ymaps.Map('map', {
                center: [55.76, 37.64],
                zoom: 9,
                controls: []
            });
        });
    }, []);
    return <div id="map" />;
};
