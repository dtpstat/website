import { types } from 'mobx-state-tree';

const PointModel = types.model('PointModel', {
    latitude: types.number,
    longitude: types.number,
});

export const DtpModel = types.model('DtpModel', {
    id: types.identifier,
    dead: types.number,
    injured: types.number,
    participants: types.number,
    point: PointModel,
    severity: types.number,
});
