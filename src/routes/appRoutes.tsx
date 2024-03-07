import {Navigate, useRoutes} from 'react-router-dom';
import {LoginPage} from "@pages/login-page/login-page";
import {LoginTab} from '@components/LoginTab/LoginTab'
import {RegistrationTab} from "@components/RegistrationTab/RegistrationTab.tsx";
import {CalendarPage} from "@pages/calendar-page";
import {TrainingPage} from "@pages/training-page";
import {ProgressPage} from "@pages/progress-page";
import {ProfilePage} from "@pages/profile-page";
import {ErrorIcon, SuccessIcon, WarningIcon} from "@components/Icon/library";
import {MessageLayout} from "@components/Layouts/MessageLayout";
import {ProtectedRoute} from "@components/ProtectedRoute/ProtectedRoute";
import {MainPage} from "@pages/main-page";
import {RecoveryPasswordForm} from "@components/RecoveryPasswordForm/RecoveryPasswordForm.tsx";
import {RecoveryCodeForm} from "@components/RecoveryCodeForm/RecoveryCodeForm.tsx";
import {FeedbacksPage} from "@pages/feedbacks-page/feedbacks-page.tsx";
import {useEffect} from "react";
import {MainLayout} from "@components/Layouts/MainLayout";

export const routesConfig = [
    {
        path: '/auth',
        element: <LoginPage/>,
        children: [
            {
                index: true,
                element: <LoginTab/>
            },
            {
                element: <RegistrationTab/>,
                path: 'registration'
            },


        ],
    },


    {
        element: <RecoveryPasswordForm/>,
        path: 'auth/change-password',
    },
    {
        element: <RecoveryCodeForm/>,
        path: 'auth/confirm-email'
    },

    {
        path: 'result',
        element: <MainLayout/>,
        children: [
            {
                path: 'error-login',
                element: <MessageLayout
                    icon={<WarningIcon/>}
                    message={'Что-то пошло не так. Попробуйте еще раз'}
                    title={'Вход не выполнен'}
                    actionText={'Повторить'}
                    url={'/auth'}
                    testId={'login-retry-button'}/>,

            },
            {
                path: 'error-check-email-no-exist',
                element: <MessageLayout
                    icon={<ErrorIcon/>}
                    message={'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.'}
                    title={'Такой e-mail не зарегистрирован'}
                    actionText={'Попробовать снова'}
                    url={'/auth'}
                    testId={'check-retry-button'}
                />
            },
            {
                path: 'error-change-password',
                element: <MessageLayout
                    icon={<ErrorIcon/>}
                    message={'Что-то пошло не так. Попробуйте еще раз'}
                    title={'Данные не сохранились'}
                    actionText={'Повторить'}
                    url={'/auth/change-password'}
                    testId={'change-retry-button'}/>
            },
            {
                path: 'success-change-password',
                element: <MessageLayout
                    icon={<SuccessIcon/>}
                    message={'Теперь можно войти в аккаунт, используя свой логин и новый пароль'}
                    title={'Пароль успешно изменен'}
                    actionText={'Войти'}
                    url={'/auth'}
                    testId={'change-entry-button'}/>
            },
            {
                path: 'success',
                element: <MessageLayout

                    icon={<SuccessIcon/>}
                    message={'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'}
                    title={'Регистрация успешна'}
                    actionText={'Войти'}
                    url={'/auth'}
                    testId={'registration-enter-button'}
                />
            },
            {
                path: 'error-user-exist',
                element: <MessageLayout
                    icon={<ErrorIcon/>}
                    message={'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'}
                    title={'Данные не сохранились'}
                    actionText={'Назад к регистрации'}
                    url={'/auth/registration'}
                    testId={'registration-back-button'}

                />
            },
            {
                path: 'error',
                element: <MessageLayout
                    icon={<ErrorIcon/>}
                    message={'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.'}
                    title={'Данные не сохранились'}
                    actionText={'Повторить'}
                    url={'/auth/registration'}
                    testId={'registration-retry-button'}/>
            },
            {
                path: 'error-check-email',
                element: <MessageLayout
                    icon={<ErrorIcon/>}
                    message={'Произошла ошибка, попробуйте отправить форму еще раз'}
                    title={'Что-то пошло не так'}
                    actionText={'Назад'}
                    url={'/auth'}
                    testId={'check-back-button'}/>

            },
        ]
    },
    {
        path: '/',
        element: <ProtectedRoute><MainLayout/></ProtectedRoute>,
        children: [
            {index: true, element: <Navigate to="/main" replace/>},
            {path: 'main', element: <MainPage/>},
            {path: 'calendar', element: <CalendarPage/>},
            {path: 'training', element: <TrainingPage/>},
            {path: 'progress', element: <ProgressPage/>},
            {path: 'profile', element: <ProfilePage/>},
            {path: 'feedbacks', element: <FeedbacksPage/>}
        ],
    },
];

export const AppRoutes = () => {
    useEffect(() => {
        const handleBeforeUnload = () => {
            sessionStorage.clear()
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        };
    }, [])

    const element = useRoutes(routesConfig);
    return element;
};


