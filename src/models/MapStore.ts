import { cast, types, getParent } from 'mobx-state-tree'

import { Coordinate, Bounds, Scale } from 'types'

const supportedIconsBySeverity = {
  0: 'svg/circle-0.svg',
  1: 'svg/circle-1.svg',
  3: 'svg/circle-3.svg',
  4: 'svg/circle-4.svg',
  default: 'svg/circle-default.svg',
}

export const MapStore = types
  .model('MapStore', {
    center: types.array(types.number),
    zoom: 1,
    bounds: types.array(types.array(types.number)),
  })
  .actions((self) => {
    // TODO: improve types
    let map: any = null
    let objectManager: any = null
    let heatmap: any = null

    function setCenter(center: Coordinate) {
      self.center = cast(center)
    }
    function setBounds(bounds: Bounds) {
      self.bounds = cast(bounds)
    }
    function setZoom(zoom: Scale) {
      self.zoom = zoom
    }

    function updateBounds(center: Coordinate, zoom: Scale, bounds: Bounds) {
      setCenter(center)
      setBounds(bounds)
      setZoom(zoom)
      // @ts-ignore
      getParent(self).onBoundsChanged(center, zoom, bounds)
    }

    function setMap(mapInstance: any) {
      map = mapInstance

      // @ts-ignore
      objectManager = new window.ymaps.ObjectManager({})
      // @ts-ignore
      heatmap = new window.ymaps.Heatmap([], {
        radius: 15,
        dissipating: false,
        opacity: 0.8,
        intensityOfMidpoint: 0.5,
      })
      heatmap.setMap(map, {})

      map.geoObjects.add(objectManager)

      updateBounds(map.getCenter(), map.getZoom(), map.getBounds())
    }

    const getMap = (): any => map

    const passFilters = (item: any, selection: any[]): boolean => {
      for (let filter of selection) {
        const value = item[filter.id]
        const selectedValues = filter.values
        if (selectedValues.length === 0) {
          continue
        }
        if (Array.isArray(value)) {
          if (!value.some((v) => selectedValues.includes(v))) {
            return false
          }
        } else {
          if (!selectedValues.includes(value)) {
            return false
          }
        }
      }
      return true
    }

    const buildSelection = (filters: any[]) => {
      const selection: any[] = []
      for (let filter of filters.filter((f) => f.name !== 'date')) {
        const values = filter.values
          .filter((v: any) => v.selected)
          .map((v: any) => (v.value === -1 ? v.preview : v.value))
        selection.push({ id: filter.key || filter.name, values })
      }
      return selection
    }

    function drawObjects(items: any[], filters: any[]) {
      if (objectManager === null) {
        return
      }
      objectManager.removeAll()

      const selection = buildSelection(filters)

      const data = items.map((item) => {
        var icon = supportedIconsBySeverity.default
        var id = `${item.id}_0`
        if (passFilters(item, selection)) {
          if (item.severity in supportedIconsBySeverity) {
            // @ts-ignore
            icon = supportedIconsBySeverity[item.severity]
            id = `${item.id}`
          }
        }
        return {
          type: 'Feature',
          id: id,
          geometry: {
            type: 'Point',
            coordinates: [item.point.latitude, item.point.longitude],
          },
          options: {
            iconLayout: 'default#image',
            iconImageHref: icon,
            iconImageSize: [10, 10],
            iconImageOffset: [-5, -5],
          },
        }
      })

      if (self.zoom !== null && self.zoom <= 12) {
        heatmap?.setData(
          data.filter((p: any) => p.options.iconImageHref !== supportedIconsBySeverity.default)
        )
      } else {
        if (heatmap !== null) {
          heatmap.setData([])
        }
        objectManager.add(data)
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
    }
  })
