import React, { useCallback } from 'react'
import './Map.css'
import { observer } from 'mobx-react'

import { useStore } from 'models/RootStore'
// import { debounce } from 'utils'

export const Map = observer(function Map() {
  const { mapStore } = useStore()
  // const boundsChangeHandler = useCallback( // TODO
  //   debounce((e) => {
  //     const { newCenter, newZoom, newBounds } = e.originalEvent
  //     mapStore.updateBounds(newCenter, newZoom, newBounds)
  //   }, 1000),
  //   [mapStore]
  // )
  const boundsChangeHandler = useCallback(
    (e) => {
      const { newCenter, newZoom, newBounds } = e.originalEvent
      mapStore.updateBounds(newCenter, newZoom, newBounds)
    },
    [mapStore]
  )
  React.useEffect(() => {
    window.ymaps.ready(['Heatmap']).then(() => {
      const { center, zoom } = mapStore
      mapStore.setMap(
        new window.ymaps.Map(
          'map',
          {
            center,
            zoom,
            controls: [],
          },
          {
            avoidFractionalZoom: true,
          }
        )
      )
      mapStore.getMap().events.add('boundschange', boundsChangeHandler)
    })
  }, [mapStore, boundsChangeHandler])

  return <div id='map' />
})
