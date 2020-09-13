import { cast, flow, types, getParent } from 'mobx-state-tree';
import { Coordinate, Bounds, Scale } from 'types';

const supportedIconsBySeverity = {
    0: 'svg/circle-0.svg',
    1: 'svg/circle-1.svg',
    3: 'svg/circle-3.svg',
    4: 'svg/circle-4.svg',
    default: 'svg/circle-default.svg',
};

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
        let heatmap: any = null;

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
            objectManager = new window.ymaps.ObjectManager({});
            // @ts-ignore
            heatmap = new window.ymaps.Heatmap([], {
                radius: 15,
                dissipating: false,
                opacity: 0.8,
                intensityOfMidpoint: 0.5,
            });
            heatmap.setMap(map, {});

            map.geoObjects.add(objectManager);

            updateBounds(map.getCenter(), map.getZoom(), map.getBounds());
        }

        function getMap(): any {
            return map;
        }

        function drawObjects(items: any[]) {
            objectManager.removeAll();

            const data = items.map((item) => {
                const icon =
                    item.severity in supportedIconsBySeverity
                        ? // @ts-ignore
                          supportedIconsBySeverity[item.severity]
                        : supportedIconsBySeverity.default;
                return {
                    type: 'Feature',
                    id: item.id,
                    geometry: {
                        type: 'Point',
                        coordinates: [
                            item.point.latitude,
                            item.point.longitude,
                        ],
                    },
                    options: {
                        iconLayout: 'default#image',
                        iconImageHref: icon,
                        iconImageSize: [10, 10],
                        iconImageOffset: [-5, -5],
                    },
                };
            });

            if (self.zoom !== null && self.zoom <= 12) {
                heatmap?.setData(data);
            } else {
                if (heatmap !== null) {
                    heatmap.setData([]);
                }
                objectManager.add(data);
            }
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
