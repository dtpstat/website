import React from 'react';

const Layers = () => {
    return (
        <div className="layers-wrap">
            <button className="btn-layers">
                <svg className="icon icon-layers">
                    <use xlinkHref="svg/sprite.svg#layers"></use>
                </svg>
            </button>
            <div className="layers-filter">
                <h4 className="subtitle2">Отображение данных</h4>
                <label className="toggle-layer" tabIndex={0}>
                    <input type="checkbox" checked={true} onChange={() => {}} />
                    <div className="checkmark">
                        <svg className="icon icon-location">
                            <use xlinkHref="svg/sprite.svg#location"></use>
                        </svg>
                        <p className="subtitle3">Точки ДТП</p>
                    </div>
                </label>
                <label className="toggle-layer" tabIndex={0}>
                    <input
                        type="checkbox"
                        checked={false}
                        disabled={true}
                        onChange={() => {}}
                    />
                    <div className="checkmark">
                        <svg className="icon icon-heat">
                            <use xlinkHref="svg/sprite.svg#heat"></use>
                        </svg>
                        <p className="subtitle3">Тепловая карта</p>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default Layers;
