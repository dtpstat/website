import React from 'react';
import './Map.css';
import { useStore } from 'models/RootStore';
import { observer } from 'mobx-react';
import { onSnapshot } from 'mobx-state-tree';

export function getPositionFromURL(url) {
    const params = new URLSearchParams(url);
    const center = params.get('center')?.split(':');
    const zoom = params.get('scale');
    return {
        center,
        zoom
    };
}

export const Map = observer(function Map() {
    const map = React.useRef(null);
    const objectManager = React.useRef(null);
    const { area } = useStore();

    React.useEffect(() => {
        window.ymaps.ready(() => {
            const { center, zoom } = getPositionFromURL(window.location.search);
            const _map = new window.ymaps.Map('map', {
                center: center ?? [55.76, 37.64],
                zoom: zoom ?? 9,
                controls: [],
            });

            const _objectManager = new window.ymaps.ObjectManager({
                clusterize: true,
                gridSize: 32,
                clusterDisableClickZoom: true,
            });
            _map.geoObjects.add(_objectManager);

            objectManager.current = _objectManager;

            map.current = _map;

            area.fetchAreaAction(_map.getCenter(), _map.getZoom(), _map.getBounds());

            _map.events.add('boundschange', (e) => {
                area.fetchAreaAction(
                    e.originalEvent.newCenter,
                    e.originalEvent.newZoom,
                    e.originalEvent.newBounds,
                );
            });
        });

        onSnapshot(area.dtp, (dtp) => {
            objectManager.current.removeAll();
            objectManager.current.add({
                type: 'FeatureCollection',
                features: dtp.map((item) => ({
                    type: 'Feature',
                    id: item.id,
                    geometry: {
                        type: 'Point',
                        coordinates: [
                            item.point.latitude,
                            item.point.longitude,
                        ],
                    },
                })),
            });
        });
    }, [area]);

    return <div id="map" />;
});
