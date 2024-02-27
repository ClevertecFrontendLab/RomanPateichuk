import React from 'react';
import {Route, Routes} from 'react-router-dom';
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
import {ErrorIcon, SuccessIcon, WarningIcon} from "@components/Icon/library.tsx";
import {Message} from "@components/Message/Message.tsx";
import {Login, SignUp} from "@pages/login-page/login-page.tsx";
import {RecoveryCodeForm} from "@components/RecoveryCodeForm/RecoveryCodeForm.tsx";
import {RecoveryPasswordForm} from "@components/RecoveryPasswordForm/RecoveryPasswordForm.tsx";




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

                    <Route path='result/error-login' element={<Message
                        isOpen={true}
                        icon={<WarningIcon/>}
                        message={'Что-то пошло не так. Попробуйте еще раз'}
                        title={'Вход не выполнен'}
                        actionText={'Повторить'}
                        url={'/auth'}
                    />}/>

                    <Route path='result/success' element={<Message
                        isOpen={true}
                        icon={<SuccessIcon/>}
                        message={'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'}
                        title={'Регистрация успешна'}
                        actionText={'Войти'}
                        url={'/auth'}
                    />}/>

                    <Route path='result/error-user-exist' element={<Message
                        isOpen={true}
                        icon={<ErrorIcon/>}
                        message={'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'}
                        title={'Данные не сохранились'}
                        actionText={'Назад к регистрации'}
                        url={'/auth/registration'}
                    />}/>

                    <Route path='result/error'  element={<Message
                        isOpen={true}
                        icon={<ErrorIcon/>}
                        message={'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.'}
                        title={'Данные не сохранились'}
                        actionText={'Повторить'}
                        url={'/auth/registration'}
                    />}/>

                    <Route path='result/error-check-email'  element={<Message
                        isOpen={true}
                        icon={<ErrorIcon/>}
                        message={'Произошла ошибка, попробуйте отправить форму еще раз'}
                        title={'Что-то пошло не так'}
                        actionText={'Назад'}
                        url={'/auth'}
                    />}/>

                    <Route path='auth/change-password'  element={<RecoveryPasswordForm/>}/>

                    <Route path='auth/confirm-email' element={<RecoveryCodeForm/>}/>

                    <Route path='result/error-check-email-no-exist'  element={<Message
                        isOpen={true}
                        icon={<ErrorIcon/>}
                        message={'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.'}
                        title={'Такой e-mail не зарегистрирован'}
                        actionText={'Попробовать снова'}
                        url={'/auth'}
                    />}/>

                    <Route path='result/error-change-password'  element={<Message
                        isOpen={true}
                        icon={<ErrorIcon/>}
                        message={'Что-то пошло не так. Попробуйте еще раз'}
                        title={'Данные не сохранились'}
                        actionText={'Повторить'}
                        url={'/auth/change-password'}
                    />}/>

                    <Route path='result/success-change-password'  element={<Message
                        isOpen={true}
                        icon={<SuccessIcon/>}
                        message={'Теперь можно войти в аккаунт, используя свой логин и новый пароль'}
                        title={'Пароль успешно изменен'}
                        actionText={'Войти'}
                        url={'/auth'}
                    />}/>



                    <Route path='/' element={<Layout />}>
                        <Route path='main' element={ <MainPage />}></Route>
                        <Route path='calendar' element={<CalendarPage/>}></Route>
                        <Route path='training' element={<TrainingPage/>}></Route>
                        <Route path='progress' element={<ProgressPage/>}></Route>
                        <Route path='profile' element={<ProfilePage/>}></Route>
                    </Route>


                </Routes>

            </HistoryRouter>
        </Provider>
    </React.StrictMode>
);
