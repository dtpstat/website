import React from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { observer } from 'mobx-react';
import { useStore } from 'models/RootStore';
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
        <button className="participant-item" selected={selected}>
            {
                <object
                    type="image/svg+xml"
                    data={`${config.STATIC_URL}${props.icon}`}
                    aria-label={props.preview}
                ></object>
            }
            {/*<svg class="icon ">
              { <use xlinkHref={`svg/sprite.svg#${props.icon}`}></use> }
            </svg> */}
            <p className="subtitle3">{props.preview}</p>
        </button>
    );
};

const ParticipantsFilter = (props) => {
    return (
        <div className="participant-filter">
            {props.values.map((item) => (
                <ParticipantFilterItem key={item.value} {...item} />
            ))}
        </div>
    );
};

const SeverityFilterItem = (props) => {
    return (
        <div className="severity-item">
            <input
                type="checkbox"
                checked={props.default}
                disabled={props.disabled}
                onChange={() => {}}
            />
            <div
                className="severity-color"
                style={{
                    background: props.disabled ? Colors.$grey50 : props.color,
                }}
            />
            <p
                className="body1"
                style={{
                    color: props.disabled ? Colors.$grey50 : Colors.$greyDark,
                }}
            >
                {props.preview}
            </p>
        </div>
    );
};

const SeverityFilter = (props) => {
    return (
        <div>
            {props.values.map((item) => (
                <SeverityFilterItem key={item.value} {...item} />
            ))}
        </div>
    );
};

const CategoryFilterItem = (props) => {
    return (
        <div className="category-item">
            <checkbox className="body2">{props.preview}</checkbox>
        </div>
    );
};

const CategoryFilter = (props) => {
    return (
        <div className="category-filter">
            {props.values.map((item) => (
                <CategoryFilterItem key={item.value} {...item} />
            ))}
        </div>
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
                        <p className="subtitle2">{filter.label}</p>
                        {createFilterComponent(filter)}
                    </div>
                );
            })}
        </div>
    );
});
