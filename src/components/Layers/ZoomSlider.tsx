import React from 'react';

const ZoomSlider = () => {
    return (
        <div className="zoom" style={{ marginBottom: '16px' }}>
            <button className="btn-plus" aria-label="Приблизить"></button>
            <div className="input-wrap">
                <input
                    type="range"
                    min="1"
                    max="100"
                    value="50"
                    className="zoom-slider"
                ></input>
                <div className="hints-wrap">
                  <button className="hint subtitle3" aria-label="Выбрать маштаб уровня домов">Дом</button>
                  <button className="hint subtitle3" aria-label="Выбрать маштаб уровня улиц">Улица</button>
                  <button className="hint subtitle3" aria-label="Выбрать маштаб уровня городов">Город</button>
                  <button className="hint subtitle3" aria-label="Выбрать маштаб уровня регионов">Регион</button>
                  <button className="hint subtitle3" aria-label="Выбрать маштаб уровня страны">Страна</button>
                  <button className="hint subtitle3" aria-label="Выбрать маштаб уровня всего мира">Мир</button>
                </div>
            </div>

            <svg className="icon icon-zones">
                <use xlinkHref="svg/sprite.svg#zones"></use>
            </svg>
            <button className="btn-minus" aria-label="Отдалить"></button>
        </div>
    );
};

export default ZoomSlider;
