import React from 'react';
import {Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createRoot} from 'react-dom/client';
import {store, history} from '@redux/configure-store';
import {HistoryRouter} from "redux-first-history/rr6";

import './index.scss';


import {AppRoutes} from "./routes/appRoutes.tsx";


const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);


root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                    <AppRoutes></AppRoutes>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>
);
