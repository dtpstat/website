import React from 'react';
import { Colors } from 'components/ui/Colors';
import SvgIcon from './SvgIcon';

const NewsItem = () => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3 className="h3">Заголовок модального окна</h3>
                    <button>
                        <SvgIcon name="decline" />
                    </button>
                </div>

                <div className="modal-body" style={{ height: '400px' }}></div>

                <div className="modal-footer">
                    <button className="btn-light">
                        <span className="subtitle1">Нет, спасибо</span>
                    </button>
                    <button className="btn-dark">
                        <span className="subtitle1">Да, пожалуйста</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
