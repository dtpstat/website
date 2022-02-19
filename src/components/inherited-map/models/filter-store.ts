import { cast, flow, Instance, types } from "mobx-state-tree";

import { fetchFilters } from "../api";
import { Accident } from "../types";
import {
  CategoryFilter,
  CategoryFilterType,
  CategoryFilterValue,
} from "./filters/category-filter";
import { DateFilter, DateFilterType } from "./filters/date-filter";
import { ParticipantsFilter } from "./filters/participants-filter";
import { RegionFilter } from "./filters/region-filter";
import { SeverityFilter } from "./filters/severity-filter";

const Filter = types.union(
  ParticipantsFilter,
  DateFilter,
  SeverityFilter,
  RegionFilter,
  CategoryFilter,
);

export type FilterType = Instance<typeof Filter>;

function convertFilter(filter: any): any {
  switch (filter.name) {
    case "date":
      return DateFilter.create(filter);
    case "participant_categories":
      return ParticipantsFilter.create(filter);
    case "severity":
      return SeverityFilter.create(filter);
    case "region":
      return RegionFilter.create(filter);
    case "category":
      return CategoryFilter.create(filter);
  }
}

export const FilterStore = types
  .model("FilterStore", {
    filters: types.array(
      types.union(
        ParticipantsFilter,
        DateFilter,
        SeverityFilter,
        RegionFilter,
        CategoryFilter,
      ),
    ),
    visible: window.innerWidth >= 768,
    search: "",
    currentKey: types.maybeNull(types.string),
  })
  .actions((self) => {
    function setFilters(filters: any[]) {
      self.filters.clear();
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- investigate if we need || [];
      self.filters = cast(filters.map(convertFilter)) || [];
    }
    const updateStreets = (accidents: Accident[] | undefined) => {
      if (accidents) {
        const streetFilter = self.filters.find(
          (filter: any) => filter.key === "street",
        ) as CategoryFilterType | undefined;
        if (streetFilter) {
          const streets = new Set<string>(
            accidents
              .map((accident) => accident.street)
              .filter((street): street is string => Boolean(street)),
          );
          const selectedStreets = new Set(
            streetFilter.values
              .filter((value) => value.selected)
              .map((value) => value.preview),
          );
          for (const selectedStreet of selectedStreets) {
            streets.add(selectedStreet);
          }
          const sortedStreets = [...streets];
          sortedStreets.sort();
          const streetValues = sortedStreets.map((street) =>
            CategoryFilterValue.create({
              preview: street,
              value: -1,
              selected: selectedStreets.has(street),
            }),
          );
          streetFilter.values = cast(streetValues);
        }
      }
    };
    const loadFilters = flow(function* loadFiltersForArea() {
      const response = yield fetchFilters();
      setFilters(response);
    });
    const setCurrentKey = (key: string) => {
      self.currentKey = key;
    };
    const setVisible = (visible: boolean) => {
      self.visible = visible;
    };
    const setSearch = (search: string) => {
      self.search = search;
    };

    return {
      setFilters,
      updateStreets,
      loadFilters,
      setCurrentKey,
      setVisible,
      setSearch,
    };
  })
  .views((self) => ({
    get date() {
      const dateFilters = self.filters.filter(
        (filter) => filter.name === "date",
      ) as DateFilterType[];

      return dateFilters[0];
    },

    get startDate() {
      return this.date?.value.start_date;
    },

    get endDate() {
      return this.date?.value.end_date;
    },
  }));
