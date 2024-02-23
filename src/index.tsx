import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store, history } from '@redux/configure-store';
import { HistoryRouter } from "redux-first-history/rr6";

import './index.scss';

import {CalendarPage} from "@pages/calendar-page";
import {LayoutComponent as Layout} from "@components/Layout";
import {MainPage} from "@pages/main-page";
import {ProfilePage} from "@pages/profile-page";
import {ProgressPage} from "@pages/progress-page";
import {TrainingPage} from "@pages/training-page";
import {LoginPage} from "@pages/login-page";
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>

                <Routes>
                    <Route path='login' element={<LoginPage/>}></Route>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<MainPage />}></Route>
                        <Route path='calendar' element={<CalendarPage/>}></Route>
                        <Route path='training' element={<TrainingPage/>}></Route>
                        <Route path='progress' element={<ProgressPage/>}></Route>
                        <Route path='profile' element={<ProfilePage/>}></Route>

                    </Route>
                </Routes>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
