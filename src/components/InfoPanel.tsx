import React from 'react'
import { observer } from 'mobx-react'

import { useStore } from 'models/RootStore'

import { Colors } from './ui/Colors'
// import InfoPanelStat from './InfoPanelStat';
// import SvgIcon from './SvgIcon'

const InfoPanelObservable = observer(function InfoPanel() {
  const { areaStore } = useStore()
  const { area, statistics } = areaStore
  if (!area) {
    return null
  }
  return (
    <div className='info-panel-wrap'>
      <div className='info-panel'>
        <h3 className='h3'>{area.name || ''}</h3>
        <p className='subtitle2' style={{ color: Colors.$grey50 }}>
          ДТП
        </p>
        <p className='subtitle2' style={{ color: Colors.$grey50 }}>
          Пострадали
        </p>
        <p className='subtitle2' style={{ color: Colors.$grey50 }}>
          Погибли
        </p>

        <p className='body2' style={{ color: Colors.$grey50 }}>
          {area.parentName}
        </p>
        <h3 className='h3' style={{ color: Colors.$greyDark }}>
          {statistics?.count.toString() || '\u00A0'}
        </h3>
        <h3 className='h3' style={{ color: Colors.$yellow }}>
          {statistics?.injured}
        </h3>
        <h3 className='h3' style={{ color: Colors.$red }}>
          {statistics?.dead}
        </h3>
      </div>
    </div>
  )

  // return (
  //   <div className='info-panel-wrap'>
  //     <div className='info-panel'>
  //       <div>
  //         <h3 className='h3' style={{ color: Colors.$greyDark }}>
  //           {area.name || ''}
  //         </h3>
  //         <p className='body2' style={{ color: Colors.$grey50 }}>
  //           {area.parentName || ''}
  //         </p>
  //       </div>
  //       <div>
  //         <p className='subtitle2' style={{ color: Colors.$grey50 }}>
  //           ДТП
  //         </p>
  //         <h3 className='h3' style={{ color: Colors.$greyDark }}>
  //           {statistics?.count}
  //         </h3>
  //       </div>
  //       <div>
  //         <p className='subtitle2' style={{ color: Colors.$grey50 }}>
  //           Пострадали
  //         </p>
  //         <h3 className='h3' style={{ color: Colors.$yellow }}>
  //           {statistics?.injured}
  //         </h3>
  //       </div>
  //       <div>
  //         <p className='subtitle2' style={{ color: Colors.$grey50 }}>
  //           Погибли
  //         </p>
  //         <h3 className='h3' style={{ color: Colors.$red }}>
  //           {statistics?.dead}
  //         </h3>
  //       </div>
  //       {/* <button className='btn-light'>
  //         <span>Подробнее</span>
  //         <SvgIcon name='decline' />
  //       </button> */}
  //     </div>
  //     {/* {InfoPanelStat()} */}
  //   </div>
  // )
})

export { InfoPanelObservable as InfoPanel }
