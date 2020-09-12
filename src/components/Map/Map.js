import React from 'react';
import './Map.css';
import { useStore } from 'models/RootStore';
import { observer } from 'mobx-react';

export function getPositionFromURL(url) {
    const params = new URLSearchParams(url);
    const center = params.get('center')?.split(':');
    const zoom = params.get('scale');
    return {
        center,
        zoom,
    };
}

export const Map = observer(function Map() {
    const { mapStore } = useStore();

    React.useEffect(() => {
        window.ymaps.ready(() => {
            const { center, zoom } = getPositionFromURL(window.location.search);
            mapStore.setMap(
                new window.ymaps.Map('map', {
                    center: center ?? [55.76, 37.64],
                    zoom: zoom ?? 9,
                    controls: [],
                }),
            );

            mapStore.getMap().events.add('boundschange', (e) => {
                const { newCenter, newZoom, newBounds } = e.originalEvent;
                mapStore.updateBounds(newCenter, newZoom, newBounds);
            });
        });
    }, [mapStore]);

    return <div id="map" />;
});
