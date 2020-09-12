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
        <div>
            <div className="inputWrap">
                <input
                    type="text"
                    className="input"
                    defaultValue="Март 2015 — Декабрь 2018"
                />
                {/* maybe it should be button not just svg */}
                <svg className="icon icon-calendar">
                    <use xlinkHref="svg/sprite.svg#calendar"></use>
                </svg>
            </div>
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
        </div>
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
        <label className="severity-item">
            <input
                type="checkbox"
                checked={props.default}
                disabled={props.disabled}
                onChange={() => {}}
            />
            <span className="checkmark">
                <svg className="icon icon-check">
                    <use xlinkHref="svg/sprite.svg#check"></use>
                </svg>
            </span>
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
        </label>
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
            <button className="btn-preview">
                <span>{props.preview}</span>
            </button>
            <button className="btn-decline">
                <svg className="icon icon-decline">
                    <use xlinkHref="svg/sprite.svg#decline"></use>
                </svg>
            </button>
        </div>
    );
};

const CategoryFilter = (props) => {
    return (
        <div className="category-filter">
            <div className="category-item">
                <svg className="icon icon-edit">
                    <use xlinkHref="svg/sprite.svg#edit"></use>
                </svg>
                <button className="btn-preview">Выделить участок</button>
            </div>
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
            <div className="filter-content">
                {area.filters.map((filter) => {
                    return (
                        <div key={filter.name} className="filter-item">
                            <p className="subtitle2">{filter.label}</p>
                            {createFilterComponent(filter)}
                        </div>
                    );
                })}
            </div>

            <button className="btn-hideFilter">
                <svg className="icon icon-arrow-up">
                    <use xlinkHref="svg/sprite.svg#arrow-up"></use>
                </svg>
                <span>Скрыть</span>
            </button>
        </div>
    );
});
