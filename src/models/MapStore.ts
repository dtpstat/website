import { cast, flow, types, getParent } from 'mobx-state-tree';
import { Coordinate, Bounds, Scale } from 'types';

export const MapStore = types
    .model('Map', {
        center: types.array(types.number),
        zoom: types.maybeNull(types.number),
        bounds: types.array(types.array(types.number)),
    })
    .actions((self) => {
        // TODO: improve types
        let map: any = null;
        let objectManager: any = null;

        function setCenter(center: Coordinate) {
            self.center = cast(center);
        }
        function setBounds(bounds: Bounds) {
            self.bounds = cast(bounds);
        }
        function setZoom(zoom: Scale) {
            self.zoom = zoom;
        }

        const updateBounds = flow(function* updateBounds(
            center: Coordinate,
            zoom: Scale,
            bounds: Bounds,
        ) {
            setCenter(center);
            setBounds(bounds);
            setZoom(zoom);
            // @ts-ignore
            yield getParent(self).area.fetchAreaAction(center, zoom, bounds);
        });

        function setMap(mapInstance: any) {
            map = mapInstance;

            // @ts-ignore
            objectManager = new window.ymaps.ObjectManager({
                clusterize: true,
                gridSize: 32,
                clusterDisableClickZoom: true,
            });

            map.geoObjects.add(objectManager);

            updateBounds(map.getCenter(), map.getZoom(), map.getBounds());
        }

        function getMap(): any {
            return map;
        }

        function drawObjects(items: any[]) {
            objectManager.removeAll();
            objectManager.add({
                type: 'FeatureCollection',
                features: items.map((item) => ({
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
        }

        return {
            setCenter,
            setBounds,
            setZoom,
            setMap,
            getMap,
            updateBounds,
            drawObjects,
        };
    });
