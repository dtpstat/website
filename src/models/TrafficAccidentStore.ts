import { flow, getRoot, types } from "mobx-state-tree";

import { fetchDtp } from "../api";
import { RootStoreType } from "./RootStore";

const getYears = (start_date: string, end_date: string) => {
  const result = [];
  const start = Number.parseInt(start_date.split("-")[0]);
  const end = Number.parseInt(end_date.split("-")[0]);
  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
};

export const TrafficAccidentStore = types
  .model({
    accs: types.frozen([]),
  })
  .actions((self) => {
    const loadTrafficAccidents = flow(function* loadTrafficAccidents(
      start_date: string,
      end_date: string,
      region: string,
    ) {
      const root = getRoot<RootStoreType>(self);
      root.incLoading();
      try {
        const data = yield fetchDtp(getYears(start_date, end_date), region);
        self.accs = data
          .flat()
          .filter(
            (a: any) =>
              a.datetime >= start_date && a.datetime <= `${end_date}Z`,
          );
        root.onTrafficAccidentsLoaded();
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      } finally {
        root.decLoading();
      }
    });

    return {
      loadTrafficAccidents,
    };
  });
