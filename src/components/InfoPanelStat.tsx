import React from 'react';

const InfoPanelStat = () => {
    return (
        <div className="stat-wrap">
            <div className="stat">
                <div className="stat-header">
                    <div className="h3">Распределение по дням</div>
                    <p className="body2">За период: Март — Апрель 2020</p>
                    <p className="body2">
                        Активные фильтры: Участники ДТП (Пешеходы,
                        Велосипедисты), Вред здоровью (Все)
                    </p>
                </div>
                <div className="stat-graph-wrap">
                    <div className="stat-graph-empty" style={{ width: '200%', flexShrink: 0 }}>
                        <p className="body2">
                            Невозможно отобразить данные.
                            <br />
                            Выберите период максимум до 90 дней (3 месяца).
                        </p>
                    </div>
                </div>
            </div>
            <div className="stat-filters">
                <h4 className="subtitle2">Временные интервалы</h4>
                <ul>
                    <li>
                        <button className="btn-rect">По часам</button>
                    </li>
                    <li>
                        <button className="btn-rect">По дням</button>
                    </li>
                    <li>
                        <button className="btn-rect">По месяцам</button>
                    </li>
                    <li>
                        <button className="btn-rect">По годам</button>
                    </li>
                </ul>
                <h4 className="subtitle2">Свойства ДТП</h4>
                <ul>
                    <li>
                        <button className="btn-rect">Типы ДТП</button>
                    </li>
                    <li>
                        <button className="btn-rect">Нарушения ПДД</button>
                    </li>
                    <li>
                        <button className="btn-rect">Теги</button>
                    </li>
                    <li>
                        <button className="btn-rect">Улицы</button>
                    </li>
                    <li>
                        <button className="btn-rect">Инфраструктура</button>
                    </li>
                    <li>
                        <button className="btn-rect">Погода</button>
                    </li>
                    <li>
                        <button className="btn-rect">Освещённость</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default InfoPanelStat;
