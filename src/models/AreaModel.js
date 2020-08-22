import { types, flow } from 'mobx-state-tree';
import config from '../config';

export const AreaModel = types
    .model('AreaModel', {
        id: types.maybeNull(types.string),
        name: types.maybeNull(types.string),
        parentName: types.maybeNull(types.string),
    })
    .actions((self) => ({
        init(id, name, parentName) {
            console.log('init');
            self.id = id;
            self.name = name;
            self.parentName = parentName;
        },
        clear() {
            self.init(null, null, null);
        },
        fetchArea: flow(function* (center, scale) {
            const response = yield fetch(
                `${config.API_URL}/stat/?center_point=${center[1]}+${center[0]}&scale=${scale}`,
            );
            const json = yield response.json();
            if (!json || !json.region_slug) {
                self.clear();
                return;
            }
            self.init(
                json.region_slug,
                json.region_name,
                json.parent_region_name,
            );
        }),
    }));
