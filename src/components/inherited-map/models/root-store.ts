import makeInspectable from "mobx-devtools-mst";
import { cast, flow, Instance, types } from "mobx-state-tree";
import * as React from "react";

import { POINTS_ZOOM } from "../utils";
import { AreaStore } from "./area-store";
import { FilterStore } from "./filter-store";
import { DateFilterType } from "./filters/date-filter";
import { buildSelection, MapStore, passFilters } from "./map-store";
import { TrafficAccidentStore } from "./traffic-accident-store";

export type RootStoreType = Instance<typeof RootStore>;

const RootStore = types
  .model("RootStore", {
    filterStore: FilterStore,
    mapStore: MapStore,
    areaStore: AreaStore,
    trafficAccidentStore: TrafficAccidentStore,
    loadingCount: 0,
  })
  .actions((self) => {
    let initBoundsChanged = false;
    let initFiltersLoaded = false;

    const afterCreate = flow(function* () {
      setMapFromUrl();
      yield self.filterStore.loadFilters();
      setDatesFromUrl();
      setFiltersFromUrl();
      initFiltersLoaded = true;
      if (initBoundsChanged) {
        updateUrl();
        loadArea();
      }
    });
    const loadArea = () => {
      const { center, zoom } = self.mapStore;
      self.areaStore.loadArea(center, zoom);
    };
    const loadAccs = () => {
      const { areaStore, filterStore, trafficAccidentStore } = self;
      if (areaStore.area) {
        trafficAccidentStore.loadTrafficAccidents(
          filterStore.startDate ?? "",
          filterStore.endDate ?? "",
          areaStore.area.parentId,
        );
      }
    };
    const updateStat = () => {
      const accs = self.trafficAccidentStore.accs;
      const area = self.areaStore.area;
      if (area) {
        const top = area.id === area.parentId;
        const allAreaAccs = top
          ? accs
          : accs.filter((a: any) => a.region_slug === area.id);
        const areaAccs = allAreaAccs.filter(prepareFilter());
        self.areaStore.setStatistics({
          count: areaAccs.length,
          injured: areaAccs.reduce((s, v: any) => s + v.injured, 0),
          dead: areaAccs.reduce((s, v: any) => s + v.dead, 0),
        });
      }
    };

    const prepareFilter = () => {
      const selection = buildSelection([...self.filterStore.filters]);

      return (a: any) => passFilters(a, selection);
    };

    const redraw = () => {
      const visibleAccs = self.trafficAccidentStore.accs.filter(
        (a: any) => a.point,
      );

      if (self.mapStore.zoom >= POINTS_ZOOM) {
        self.mapStore.setFilter(prepareFilter());
        self.mapStore.clearObjects();
        window.requestAnimationFrame(() =>
          self.mapStore.drawPoints(visibleAccs, self.mapStore.zoom),
        );
      } else {
        const accs = visibleAccs.filter(prepareFilter());
        self.mapStore.drawHeat(accs);
      }
    };

    const onTrafficAccidentsLoaded = () => {
      const accs = self.trafficAccidentStore.accs;
      self.filterStore.updateStreets(accs);
      setStreetsFromUrl();
      updateStat();
      redraw();
    };

    const onBoundsChanged = (zoom: number, prevZoom: number) => {
      initBoundsChanged = true;
      if (initFiltersLoaded) {
        updateUrl();
        loadArea();
        if (
          (zoom >= POINTS_ZOOM && prevZoom < POINTS_ZOOM) ||
          (zoom < POINTS_ZOOM && prevZoom >= POINTS_ZOOM) ||
          zoom !== prevZoom
        ) {
          redraw();
        }
      }
    };

    const onDatesChanged = () => {
      updateUrl();
      loadAccs();
    };
    const onAreaChanged = () => {
      updateStat();
    };
    const onParentAreaChanged = () => {
      loadAccs();
    };
    const onFiltersChanged = () => {
      updateUrl();
      updateStat();
      if (self.mapStore.zoom >= POINTS_ZOOM) {
        self.mapStore.setFilter(prepareFilter());
      } else {
        redraw();
      }
    };
    const incLoading = () => {
      self.loadingCount += 1;
    };
    const decLoading = () => {
      self.loadingCount -= 1;
    };
    const updateUrl = () => {
      const currentParams = new URLSearchParams(document.location.search);
      updateUrlMap(currentParams);
      updateUrlDates(currentParams);
      updateUrlFilters(currentParams);
      window.history.pushState(null, "", `?${currentParams.toString()}`);
    };
    const updateUrlMap = (currentParams: URLSearchParams) => {
      const { center, zoom } = self.mapStore;
      currentParams.set("center", `${center[0]}:${center[1]}`);
      currentParams.set("zoom", String(zoom));
    };
    const updateUrlDates = (currentParams: URLSearchParams) => {
      const value = (
        self.filterStore.filters.find(
          (f) => f.name === "date",
        ) as DateFilterType
      ).value;
      currentParams.set("start_date", value.start_date);
      currentParams.set("end_date", value.end_date);
    };
    const updateUrlFilters = (currentParams: URLSearchParams) => {
      self.filterStore.filters
        .filter((f) => f.name !== "date")
        .forEach((f: any) => {
          const id = f.key || f.name;
          currentParams.delete(id);
          const values = f.values.filter((v: any) => v.selected);
          if (values.length > 0) {
            currentParams.set(
              id,
              values
                .map((v: any) =>
                  id === "street" ? v.preview : String(v.value),
                )
                .join(";"),
            );
          }
        });
    };
    const setMapFromUrl = () => {
      const params = new URLSearchParams(document.location.search);
      const centerStr = params.get("center")?.split(":");
      const center = centerStr
        ? [
            Number.parseFloat(centerStr[0] ?? "0"),
            Number.parseFloat(centerStr[1] ?? "0"),
          ]
        : [55.76, 37.64];
      const zoomStr = params.get("zoom");
      const zoom = zoomStr ? Number.parseInt(zoomStr, 10) : 12;
      self.mapStore.center = cast(center);
      self.mapStore.zoom = zoom;
    };
    const setDatesFromUrl = () => {
      const currentParams = new URLSearchParams(document.location.search);
      const dateFilter = self.filterStore.filters.find(
        (f) => f.name === "date",
      ) as DateFilterType;
      const start_date = currentParams.get("start_date");
      const end_date = currentParams.get("end_date");
      if (start_date && end_date) {
        dateFilter.value = { start_date, end_date };
      }
    };
    const setFiltersFromUrl = () => {
      const currentParams = new URLSearchParams(document.location.search);
      self.filterStore.filters
        .filter((f) => f.name !== "date")
        .forEach((f: any) => {
          const id = f.key || f.name;
          const value = currentParams.get(id);
          if (value) {
            const values = value.split(";");
            f.values.forEach((fv: any) => {
              const s = id === "street" ? fv.preview : String(fv.value);
              fv.selected = values.includes(s);
            });
          }
        });
    };
    const setStreetsFromUrl = () => {
      const currentParams = new URLSearchParams(document.location.search);
      const streetFilter: any = self.filterStore.filters.find(
        (f: any) => f.key === "street",
      );
      const value = currentParams.get("street");
      if (value) {
        const values = value.split(";");
        streetFilter.values.forEach((fv: any) => {
          fv.selected = values.includes(fv.preview);
        });
      }
    };

    return {
      afterCreate,
      onBoundsChanged,
      onAreaChanged,
      onParentAreaChanged,
      onTrafficAccidentsLoaded,
      onDatesChanged,
      onFiltersChanged,
      incLoading,
      decLoading,
    };
  });

export const rootStore = RootStore.create({
  filterStore: {},
  mapStore: {},
  areaStore: {},
  trafficAccidentStore: {},
});

makeInspectable(rootStore);

export const RootStoreContext =
  React.createContext<typeof rootStore>(rootStore);

export function useStore() {
  const store = React.useContext(RootStoreContext);

  return store;
}