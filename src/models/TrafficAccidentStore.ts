import { fetchDtp } from 'api';
import { flow, getParent, types } from 'mobx-state-tree';
import { Bounds } from 'types';

export const TrafficAccidentStore = types.model('TrafficAccidentStore', {}).actions((self) => {
    // @ts-ignore
    const loadTrafficAccidents = flow(function* loadTrafficAccidents(
        startDate: string,
        endDate: string,
        bounds: Bounds,
    ) {
        try {
            const response = yield fetchDtp(startDate, endDate, bounds);
            // @ts-ignore
            getParent(self).onTrafficAccidentsLoaded(response);
        } catch (error) {
            if (error.name !== 'AbortError') {
                throw error;
            }
        }
    });
    return {
        loadTrafficAccidents,
    };
});
