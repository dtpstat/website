import React from 'react';
import { observer } from 'mobx-react';
import styled from '@emotion/styled';
import { useStore } from 'models/RootStore';
import { Subtitle2, Header3 } from './ui/Text';

const LocationTitle = styled.div`
    font-weight: bold;
    font-size: 22px;
    line-height: 28px;
    color: #18334a;
`;

const InfoPanelView = styled.div`
    display: flex;
    flex-direction: row;
    padding: 12px 20px;
    max-width: 683px;
    height: 76px;
    margin: 20px 16px;
    background: #ffffff;
    box-shadow: 0px 5px 15px #d4dadd;
    border-radius: 8px;
    pointer-events: all;
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
        <InfoPanelView>
            <div>
                <LocationTitle>{area.name || ''}</LocationTitle>
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
        </InfoPanelView>
    );
});

export { InfoPanelObservable as InfoPanel };
