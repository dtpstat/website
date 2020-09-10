import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import './scss/style.scss'; 
import { App } from './App';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn:
            'https://2ab4410dbc6440a7ab3bfd0963c217d5@o412018.ingest.sentry.io/5288112',
    });
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
