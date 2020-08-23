import React from 'react';
import styled from '@emotion/styled';
import './FilterPanel.css';
import { observer } from 'mobx-react';
import { useStore } from 'models/RootStore';
import { Subtitle2, Subtitle3 } from 'components/ui/Text';
import config from 'config';

const ParticipantView = styled.div`
    display: flex;
    width: 112px;
    height: 60px;
    background: ${(props) =>
        props.selected ? 'rgba(24, 51, 74, 0.72)' : '#f4f8fa'};
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    align-self: center;
    margin-right: 12px;
    margin-top: 12px;
    padding: 8px;
`;

const ParticipantFilterView = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const ParticipantFilterItem = (props) => {
    const selected = props.default === true;
    return (
        <ParticipantView selected={selected}>
            <img
                src={`${config.STATIC_URL}${props.icon}`}
                alt={props.preview}
            />
            <Subtitle3 color="#18334A">{props.preview}</Subtitle3>
        </ParticipantView>
    );
};

const ParticipantsFilter = (props) => {
    return (
        <ParticipantFilterView>
            {props.values.map((item) => (
                <ParticipantFilterItem key={item.value} {...item} />
            ))}
        </ParticipantFilterView>
    );
};

const mapping = {
    participant_categories: ParticipantsFilter,
};

function createFilterComponent(filter) {
    if (mapping.hasOwnProperty(filter.name)) {
        const Component = mapping[filter.name];
        return <Component {...filter} />;
    }
    return null;
}

export const FilterPanel = observer(function FilterPanel() {
    const { area } = useStore();

    if (area.filters.length === 0) {
        return null;
    }

    return (
        <div className="filter-panel">
            {area.filters.map((filter) => {
                return (
                    <div key={filter.name} className="filter-item">
                        <Subtitle2 color="#18334A">{filter.label}</Subtitle2>
                        {createFilterComponent(filter)}
                    </div>
                );
            })}
        </div>
    );
});
