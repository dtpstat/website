import React from 'react';
import { observer } from 'mobx-react';
import { Colors } from './ui/Colors';
import { useStore } from 'models/RootStore';

const InfoPanelObservable = observer(function InfoPanel() {
    const { area } = useStore();
    if (!area.id) {
        return null;
    }

    return (
        <article className="info-panel">
            <div>
                <h3 className="h3" style={{ color: Colors.$greyDark }} >{area.name || ''}</h3>
                <p className="body2" style={{ color: Colors.$grey50 }}>{area.parentName || ''}</p>
            </div>
            <div>
                <p className="subtitle2" style={{ color: Colors.$grey50 }}>ДТП</p>
                <h3 className="h3" style={{ color: Colors.$greyDark }}>{area?.count}</h3>
            </div>
            <div>
                <p className="subtitle2" style={{ color: Colors.$grey50 }}>Пострадали</p>
                <h3 className="h3" style={{ color: Colors.$yellow }}>{area?.injured}</h3>
            </div>
            <div>
                <p className="subtitle2" style={{ color: Colors.$grey50 }}>Погибли</p>
                <h3 className="h3" style={{ color: Colors.$red }}>{area?.dead}</h3>
            </div>
            <button className="btn btn-light" style={{ alignSelf: 'center' }}>Подробнее</button>
        </article>
    );
});

export { InfoPanelObservable as InfoPanel };
