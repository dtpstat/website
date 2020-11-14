import { cast, types, getRoot } from 'mobx-state-tree'
import ReactDOMServer from 'react-dom/server'

import { Coordinate, Bounds, Scale } from 'types'

import { RootStoreType } from './RootStore'
import { InfoBalloon, InfoBalloonContent } from '../components/InfoBalloon'

const supportedIconsBySeverity = {
  0: 'svg/circle-0.svg',
  1: 'svg/circle-1.svg',
  3: 'svg/circle-3.svg',
  4: 'svg/circle-4.svg',
  default: 'svg/circle-default.svg',
}

// const colorBySeverity = {
//   1: '#FFB81F',
//   3: '#FF7F24',
//   4: '#FF001A',
// }

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
      getRoot<RootStoreType>(self).onBoundsChanged()
    }

    function setMap(mapInstance: any) {
      map = mapInstance

      // @ts-ignore
      objectManager = new window.ymaps.ObjectManager({
        // clusterize: true,
      })

      objectManager.objects.events.add('click', (ev: { get: (arg0: string) => string }) => {
        handlerClickToObj(ev.get('objectId'))
      })
      objectManager.objects.balloon.events.add('userclose', () => {
        handlerCloseBalloon()
      })
      objectManager.objects.balloon.events.add('open', (ev: { get: (arg0: string) => string }) => {
        handlerOpenBalloon(ev.get('objectId'))
      })
      objectManager.clusters.balloon.events.add('close', () => {
        handlerCloseBalloon()
      })
      objectManager.clusters.state.events.add('change', () => {
        handlerActiveChanged(objectManager.clusters.state.get('activeObject'))
      })
      objectManager.clusters.balloon.events.add('close', () => {
        handlerCloseBalloon()
      })

      // @ts-ignore
      heatmap = new window.ymaps.Heatmap([], {
        radius: 15,
        dissipating: false,
        opacity: 0.8,
        intensityOfMidpoint: 0.5,
      })
      heatmap.setMap(map, {})

      objectManager.setFilter(initialFilter)

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

    const initialFilter = (item: any) => !item.id.startsWith('_')

    const passFilters2 = (item: any, selection: any[]): boolean =>
      passFilters(item, selection) === item.visible

    const updateFilter = (filters: any[]) => {
      const selection = buildSelection(filters)
      objectManager.setFilter((obj: any) => passFilters2(obj.properties, selection))
    }

    const handlerClickToObj = (objectId: string) => {
      const obj = objectManager.objects.getById(objectId)
      obj.properties.balloonContentBody = ReactDOMServer.renderToStaticMarkup(
        InfoBalloon({
          id: obj.properties.id,
          address: obj.properties.address,
          categoryName: obj.properties.category_name,
          dead: obj.properties.dead,
          datetime: new Date(obj.properties.datetime),
          injured: obj.properties.injured,
        })
      )
      objectManager.objects.balloon.open(objectId)
    }

    const handlerActiveChanged = (obj: any) => {
      obj.properties.balloonContentBody = ReactDOMServer.renderToStaticMarkup(
        InfoBalloonContent({
          id: obj.properties.id,
          address: obj.properties.address,
          categoryName: obj.properties.category_name,
          dead: obj.properties.dead,
          datetime: new Date(obj.properties.datetime),
          injured: obj.properties.injured,
        })
      )
      handlerOpenBalloon(obj.id)
    }

    const handlerOpenBalloon = (objectId: string) => {
      const currentParams = new URLSearchParams(document.location.search)
      currentParams.set('active-obj', objectId)
      window.history.pushState(null, '', `?${currentParams.toString()}`)
    }

    const handlerCloseBalloon = () => {
      const currentParams = new URLSearchParams(document.location.search)
      currentParams.delete('active-obj')
      window.history.pushState(null, '', `?${currentParams.toString()}`)
    }

    const createFeature = (item: any) => ({
      type: 'Feature',
      id: item.id,
      geometry: {
        type: 'Point',
        coordinates: [item.point.latitude, item.point.longitude],
      },
      properties: {
        ...item,
        clusterCaption: item.id,
        visible: true,
      },
      options: {
        iconLayout: 'default#image',
        // @ts-ignore
        iconImageHref: supportedIconsBySeverity[item.severity],
        iconImageSize: [10, 10],
        iconImageOffset: [-5, -5],

        // preset: 'islands#circleIcon',
        // @ts-ignore
        // iconColor: colorBySeverity[severity],
      },
    })

    const addObjects = (items: any[]) => {
      if (objectManager === null) {
        return
      }

      const params = new URLSearchParams(window.location.search)
      const activeObject = params.get('active-obj')
      let isOpenBalloon = false

      const data: any[] = []
      items.forEach((item: any) => {
        if (objectManager.objects.getById(item.id) === null) {
          if (activeObject && activeObject === item.id) {
            isOpenBalloon = true
          }
          data.push(createFeature(item))
          const grey = createFeature(item)
          grey.id = '_' + grey.id
          grey.properties.visible = false
          grey.options.iconImageHref = supportedIconsBySeverity.default
          data.push(grey)
        }
      })

      objectManager.add(data)

      if (activeObject && isOpenBalloon) {
        handlerClickToObj(activeObject)
      }
    }

    const clearObjects = () => {
      objectManager.removeAll()
    }

    return {
      setCenter,
      setBounds,
      setZoom,
      setMap,
      getMap,
      updateBounds,
      addObjects,
      updateFilter,
      clearObjects,
    }
  })
