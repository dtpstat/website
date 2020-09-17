import React from 'react';
import SvgIcon from './SvgIcon';

const Toast = () => {
    return (
        <div>
            <div
                className="toast"
                role="link"
                style={{
                    bottom: '100px',
                    flexDirection: 'column',
                    height: '66px',
                }}
            >
                <p className="body3">Сбор пожертвований на проект</p>
                <div className="progress-wrap">
                    <div className="progress-bar"></div>
                </div>
                <p className="body3">35 576 ₽ из 50 000 ₽</p>
                <button>
                    <SvgIcon name="decline"/>
                </button>
            </div>

            <div className="toast" role="link">
                <div className="img"></div>
                <p className="body3">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Eum, in.
                </p>
                <button>
                    <SvgIcon name="decline"/>
                </button>
            </div>
        </div>
    );
};

export default Toast;
