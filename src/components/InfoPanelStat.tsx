import React from 'react';

const InfoPanelStat = () => {
    return (
        <div className="info-panel-stat">
            <div className="stat">
                <div className="stat-header">
                    <div className="h3">Распределение по дням</div>
                    <p className="body2">За период: Март — Апрель 2020</p>
                    <p className="body2">
                        Активные фильтры: Участники ДТП (Пешеходы,
                        Велосипедисты), Вред здоровью (Все)
                    </p>
                </div>
            </div>
            <div className="filters">
                <h4 className="subtitle2">Временные интервалы</h4>
                <ul>
                    <li>
                        <button>По часам</button>
                    </li>
                    <li>
                        <button>По дням</button>
                    </li>
                    <li>
                        <button>По месяцам</button>
                    </li>
                    <li>
                        <button>По годам</button>
                    </li>
                </ul>
                <h4 className="subtitle2">Свойства ДТП</h4>
                <ul>
                    <li>
                        <button>Типы ДТП</button>
                    </li>
                    <li>
                        <button>Нарушения ПДД</button>
                    </li>
                    <li>
                        <button>Теги</button>
                    </li>
                    <li>
                        <button>Улицы</button>
                    </li>
                    <li>
                        <button>Инфраструктура</button>
                    </li>
                    <li>
                        <button>Погода</button>
                    </li>
                    <li>
                        <button>Освещённость</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default InfoPanelStat;
