import React from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styled from '@emotion/styled';
import { observer } from 'mobx-react';
import { useStore } from 'models/RootStore';
import { Subtitle2, Body1 } from 'components/ui/Text';
import config from 'config';
import { DateRange } from 'react-date-range';
import { Colors } from '../ui/Colors';

const DateFilter = (props) => {
    const handleSelect = () => {};
    return (
        <DateRange
            editableDateInputs
            moveRangeOnFirstSelection={false}
            ranges={[
                {
                    startDate: new Date(props.defaultValue.startDate),
                    endDate: new Date(props.defaultValue.endDate),
                    key: 'selection',
                },
            ]}
            onChange={handleSelect}
        />
    );
};

const ParticipantFilterItem = (props) => {
    const selected = props.default === true;
    return (
        <div className="participant-item" selected={selected}>
            <img
                src={`${config.STATIC_URL}${props.icon}`}
                alt={props.preview}
            />
            <p className="subtitle3" style={{ color: Colors.$greyDark }} >{props.preview}</p>
        </div>
    );
};

const ParticipantsFilter = (props) => {
    return (
        <div className="participant-filter" >
            {props.values.map((item) => (
                <ParticipantFilterItem key={item.value} {...item} />
            ))}
        </div>
    );
};

const SeverityFilterView = styled.div``;

const SeverityColor = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 6px;
    margin-left: 11px;
    margin-right: 8px;
    background: ${(props) => props.color};
`;

const SeverityFilterItemView = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SeverityFilterItem = (props) => {
    return (
        <SeverityFilterItemView>
            <input
                type="checkbox"
                checked={props.default}
                disabled={props.disabled}
                onChange={() => {}}
            />
            <SeverityColor
                color={props.disabled ? 'rgba(24, 51, 74, 0.5)' : props.color}
            />
            <Body1
                color={props.disabled ? 'rgba(24, 51, 74, 0.5);' : '#18334A'}
            >
                {props.preview}
            </Body1>
        </SeverityFilterItemView>
    );
};

const SeverityFilter = (props) => {
    return (
        <SeverityFilterView>
            {props.values.map((item) => (
                <SeverityFilterItem key={item.value} {...item} />
            ))}
        </SeverityFilterView>
    );
};

const CategoryFilterView = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const CategoryItemView = styled.div`
    padding: 4px 8px;
    background: #f4f8fa;
    border-radius: 4px;
    margin-left: 8px;
    margin-bottom: 12px;
`;

const CategoryFilterItem = (props) => {
    return (
        <CategoryItemView>
            <Body1 color="#18334A">{props.preview}</Body1>
        </CategoryItemView>
    );
};

const CategoryFilter = (props) => {
    return (
        <CategoryFilterView>
            {props.values.map((item) => (
                <CategoryFilterItem key={item.value} {...item} />
            ))}
        </CategoryFilterView>
    );
};

const mapping = {
    participant_categories: ParticipantsFilter,
    severity: SeverityFilter,
    category: CategoryFilter,
    date: DateFilter,
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
