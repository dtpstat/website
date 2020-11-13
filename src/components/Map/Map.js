import React, { useCallback } from 'react'
import './Map.css'
import { observer } from 'mobx-react'

import { useStore } from 'models/RootStore'
import { debounce, LOADING_ZOOM } from 'utils'

export function getPositionFromURL(url) {
  const params = new URLSearchParams(url)
  const center = params.get('center')?.split(':')
  const zoom = params.get('scale')
  return {
    center,
    zoom,
  }
}

export const Map = observer(function Map() {
  const { mapStore } = useStore()
  const boundsChangeHandler = useCallback(
    debounce((e) => {
      const { newCenter, newZoom, newBounds } = e.originalEvent
      mapStore.updateBounds(newCenter, newZoom, newBounds)
    }, 1000),
    [mapStore]
  )

  React.useEffect(() => {
    window.ymaps.ready(['Heatmap']).then(() => {
      const { center, zoom } = getPositionFromURL(window.location.search)
      mapStore.setMap(
        new window.ymaps.Map('map', {
          center: center ?? [55.76, 37.64],
          zoom: zoom ?? 9,
          controls: [],
        })
      )

      mapStore.getMap().events.add('boundschange', boundsChangeHandler)
    })
  }, [mapStore, boundsChangeHandler])

  return <div id='map' className={mapStore.zoom >= LOADING_ZOOM ? 'with-loading' : ''} />
})
