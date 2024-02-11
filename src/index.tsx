import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from '@redux/configure-store';

import './index.css';
import 'antd/dist/antd.css'
import 'normalize.css';

import {CalendarPage} from "@pages/calendar-page";
import {LayoutComponent as Layout} from "@components/Layout";
import {MainPage} from "@pages/main-page";
import {ProfilePage} from "@pages/profile-page";
import {ProgressPage} from "@pages/progress-page";
import {TrainingPage} from "@pages/training-page";

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<MainPage />}></Route>
                        <Route path='calendar' element={<CalendarPage/>}></Route>
                        <Route path='training' element={<TrainingPage/>}></Route>
                        <Route path='progress' element={<ProgressPage/>}></Route>
                        <Route path='profile' element={<ProfilePage/>}></Route>
                    </Route>
                </Routes>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
);
