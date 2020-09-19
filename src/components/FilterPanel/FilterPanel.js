import React from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { observer } from 'mobx-react';
import { useStore } from 'models/RootStore';
import config from 'config';
import { Colors } from '../ui/Colors';

// eslint-disable-next-line
const CategoryHeader = () => {
    return (
        <div className="filter-header">
            <button className="btn-back">
                <svg className="icon icon-arrow-back">
                    <use xlinkHref="svg/sprite.svg#arrow-back"></use>
                </svg>
                <span>Нарушения ПДД</span>
            </button>
            <div className="tags-wrap">
                <div className="category-tag-light" tabIndex={0}>
                    <button className="btn-light">
                        <span>Превышение скорости</span>
                        <svg className="icon icon-decline">
                            <use xlinkHref="svg/sprite.svg#decline"></use>
                        </svg>
                    </button>
                </div>
                <div className="category-tag-light" tabIndex={0}>
                    <button className="btn-light">
                        <span>Нет прав</span>
                        <svg className="icon icon-decline">
                            <use xlinkHref="svg/sprite.svg#decline"></use>
                        </svg>
                    </button>
                </div>
                <div className="category-tag-light" tabIndex={0}>
                    <button className="btn-light">
                        <span>Превышение скорости</span>
                        <svg className="icon icon-decline">
                            <use xlinkHref="svg/sprite.svg#decline"></use>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="inputWrap">
                <input type="text" className="input" placeholder="Введите название нарушения" />
                {/* maybe it should be button not just svg */}
                <button className="btn-search">
                    <svg className="icon icon-search">
                        <use xlinkHref="svg/sprite.svg#search"></use>
                    </svg>
                </button>
            </div>
        </div>
    );
};

const DateFilter = (props) => {
    return (
        <div>
            <div className="inputWrap">
                <input type="text" className="input" defaultValue="Март 2015 — Декабрь 2018" />
                <svg className="icon icon-calendar">
                    <use xlinkHref="svg/sprite.svg#calendar"></use>
                </svg>
            </div>
        </div>
    );
};

const ParticipantFilterItem = observer(function ParticipantFilterItem(props) {
    const { item } = props;
    return (
        <button
            className={item.selected ? 'participant-item active' : 'participant-item'}
            selected={item.selected}
            tabIndex="0"
            onClick={item.changeSelection}
        >
            {
                <object
                    type="image/svg+xml"
                    data={`${config.STATIC_URL}${item.icon}`}
                    aria-label={item.preview}
                ></object>
            }
            <p className="subtitle3">{item.preview}</p>
        </button>
    );
});

const ParticipantsFilter = (props) => {
    return (
        <div className="participant-filter">
            {props.values.map((item) => (
                <ParticipantFilterItem key={item.value} item={item} />
            ))}
        </div>
    );
};

const SeverityFilterItem = observer(function SeverityFilterItem(props) {
    const { item } = props;
    return (
        <li>
            <label className="severity-item" tabIndex="0">
                <input
                    type="checkbox"
                    checked={item.selected}
                    disabled={item.disabled}
                    onChange={item.changeSelection}
                />
                <span className="checkmark">
                    <svg className="icon icon-check">
                        <use xlinkHref="svg/sprite.svg#check"></use>
                    </svg>
                </span>
                <div
                    className="severity-color"
                    style={{
                        background: item.disabled ? Colors.$grey50 : item.color,
                    }}
                />
                <p
                    className="body1"
                    style={{
                        color: item.disabled ? Colors.$grey50 : Colors.$greyDark,
                    }}
                >
                    {item.preview}
                </p>
            </label>
        </li>
    );
});

const SeverityFilter = (props) => {
    return (
        <ul>
            {props.values.map((item) => (
                <SeverityFilterItem key={item.value} item={item} />
            ))}
        </ul>
    );
};

const CategoryFilterItem = (props) => {
    return (
        <div className="category-tag" tabIndex="0">
            <button className="btn-rect">
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
            <div className="category-item__draw" tabIndex="0">
                <svg className="icon icon-edit">
                    <use xlinkHref="svg/sprite.svg#edit"></use>
                </svg>
                <button className="btn-rect">Выделить участок</button>
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
    const { filterStore } = useStore();
    const { filters } = filterStore;

    if (filters.length === 0) {
        return null;
    }

    return (
        <div className="filter-panel">
            {/* {CategoryHeader()} */}
            <div className="filter-content">
                {filters.map((filter) => {
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
