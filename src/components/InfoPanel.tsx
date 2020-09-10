import React from 'react';
import { observer } from 'mobx-react';
import styled from '@emotion/styled';
import { useStore } from 'models/RootStore';
import { Subtitle2, Header3 } from './ui/Text';

const LocationTitle = styled.h3`
    color: #18334a;
`;

const LocationDescription = styled.div`
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: rgba(24, 51, 74, 0.5);
    margin-top: 4px;
`;

const StatisticsView = styled.div`
    margin-left: 40px;
`;

const InfoPanelObservable = observer(function InfoPanel() {
    const { area } = useStore();
    if (!area.id) {
        return null;
    }

    return (
        <article className="info-panel">
            <div>
                <LocationTitle className="h3">{area.name || ''}</LocationTitle>
                <LocationDescription>
                    {area.parentName || ''}
                </LocationDescription>
            </div>
            <StatisticsView>
                <Subtitle2 color="rgba(24, 51, 74, 0.5)">ДТП</Subtitle2>
                <Header3 color="#18334A">{area?.count}</Header3>
            </StatisticsView>
            <StatisticsView>
                <Subtitle2 color="rgba(24, 51, 74, 0.5)">Пострадали</Subtitle2>
                <Header3 color="#FFB81F">{area?.injured}</Header3>
            </StatisticsView>
            <StatisticsView>
                <Subtitle2 color="rgba(24, 51, 74, 0.5)">Погибли</Subtitle2>
                <Header3 color="#FF001A">{area?.dead}</Header3>
            </StatisticsView>
        </article>
    );
});

export { InfoPanelObservable as InfoPanel };
