import React from 'react';
import { Colors } from 'components/ui/Colors';
import SvgIcon from '../SvgIcon';

const Footer = () => {
    return (
        <div className="footer">
            <div className="container" style={{ overflow: 'hidden' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '0 -20px 40px',
                    }}
                >
                    <div style={{ maxWidth: 'calc(50% - 40px)' }}>
                        <img src="svg/logo.svg" alt="Лого сайта" />
                        <p className="body1" style={{ marginTop: '18px' }}>
                            Проект посвящен проблеме дорожно-транспортных происшествий в России.
                            Цель проекта — повышение безопасности дорожного движения и снижение
                            смертности в ДТП.
                        </p>
                    </div>
                    <div>
                        <h3 className="h3" style={{ marginBottom: '16px' }}>
                            Сбор регулярных пожертвований на проект
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
