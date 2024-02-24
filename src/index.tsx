import React from 'react';
import {Navigate, redirect, Route, Routes, useNavigate} from 'react-router-dom';
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
import {SuccessIcon} from "@components/Icon/library.tsx";
import {Message} from "@components/Message/Message.tsx";
import {Login, SignUp} from "@pages/login-page/login-page.tsx";

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);


root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>

                <Routes>

                    <Route path='auth' element={<LoginPage/>}>
                        <Route index element={<Login/>}></Route>
                        <Route path='registration' element={<SignUp/>}></Route>
                    </Route>

                    <Route path='result' element={<Message
                        isOpen={true}
                        icon={<SuccessIcon/>}
                        message={'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'}
                        title={'Регистрация успешна'}
                        actionText={'Войти'}
                        url={'/auth/registration'}
                        action={() => {
                            alert('!')
                        }}
                    />}/>


                    <Route path='/' element={<Layout />}>
                        <Route path='main' element={<MainPage />}></Route>
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
