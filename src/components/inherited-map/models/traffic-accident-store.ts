import { flow, getRoot, types } from "mobx-state-tree";

import { fetchDtp } from "../api";
import { Accident } from "../types";
import { RootStoreType } from "./root-store";

const getYears = (startDate: string, endDate: string) => {
  const result = [];
  const start = Number.parseInt(startDate.split("-")[0] ?? "0");
  const end = Number.parseInt(endDate.split("-")[0] ?? "0");
  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
};

export const TrafficAccidentStore = types
  .model({
    accs: types.frozen<Accident[]>([]),
  })
  .actions((self) => {
    const loadTrafficAccidents = flow(function* loadTrafficAccidents(
      startDate: string,
      endDate: string,
      region: string,
    ) {
      const root = getRoot<RootStoreType>(self);
      root.incLoading();
      try {
        const data = yield fetchDtp(getYears(startDate, endDate), region);
        self.accs = data
          .flat()
          .filter(
            (a: any) => a.datetime >= startDate && a.datetime <= `${endDate}Z`,
          );
        root.onTrafficAccidentsLoaded();
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
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
