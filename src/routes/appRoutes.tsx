import {Navigate, useRoutes} from 'react-router-dom';
import {Login, LoginPage, SignUp} from "@pages/login-page/login-page";
import {CalendarPage} from "@pages/calendar-page";
import {TrainingPage} from "@pages/training-page";
import {ProgressPage} from "@pages/progress-page";
import {ProfilePage} from "@pages/profile-page";
import {ErrorIcon, SuccessIcon, WarningIcon} from "@components/Icon/library";
import {MessageLayout} from "@components/MessageLayout/MessageLayout";
import {ProtectedRoute} from "@components/ProtectedRoute/ProtectedRoute";
import {LayoutComponent} from "@components/LayoutComponent";
import {MainPage} from "@pages/main-page";
import {RecoveryPasswordForm} from "@components/RecoveryPasswordForm/RecoveryPasswordForm.tsx";
import {RecoveryCodeForm} from "@components/RecoveryCodeForm/RecoveryCodeForm.tsx";


export const routesConfig = [
    {
        path: '/auth',
        element: <LoginPage/>,
        children: [
            {
                index: true,
                element: <Login/>
            },
            {
                element: <SignUp/>,
                path: 'registration'
            },


        ],
    },


    {
        element: <RecoveryPasswordForm/>,
        path: 'auth/change-password',
    },
    {
        element: <RecoveryCodeForm/> ,
        path: 'auth/confirm-email'
    },

    {
        path: 'result',
        element: <LayoutComponent/>,
        children: [
            {
                path: 'error-login',
                element: <MessageLayout isOpen={true}
                                      icon={<WarningIcon/>}
                                      message={'Что-то пошло не так. Попробуйте еще раз'}
                                      title={'Вход не выполнен'}
                                      actionText={'Повторить'}
                                      url={'/auth'}
                                      testId={'login-retry-button'}/>,

            },
            {
                path: 'error-check-email-no-exist',
                element: <MessageLayout isOpen={true}
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
                element: <MessageLayout isOpen={true}
                                      icon={<ErrorIcon/>}
                                      message={'Что-то пошло не так. Попробуйте еще раз'}
                                      title={'Данные не сохранились'}
                                      actionText={'Повторить'}
                                      url={'/auth/change-password'}
                                      testId={'change-retry-button'}/>
            },
            {
                path: 'success-change-password',
                element: <MessageLayout isOpen={true}
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
                    isOpen={true}
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
                element: <MessageLayout isOpen={true}
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
                element: <MessageLayout isOpen={true}
                                      icon={<ErrorIcon/>}
                                      message={'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.'}
                                      title={'Данные не сохранились'}
                                      actionText={'Повторить'}
                                      url={'/auth/registration'}
                                      testId={'registration-retry-button'}/>
            },
            {
                path: 'error-check-email',
                element: <MessageLayout isOpen={true}
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
        element: <ProtectedRoute><LayoutComponent/></ProtectedRoute>,
        children: [
            {index: true, element: <Navigate to="/main" replace />},
            { path: 'main', element: <MainPage/>},
            {path: 'calendar', element: <CalendarPage/>},
            {path: 'training', element: <TrainingPage/>},
            {path: 'progress', element: <ProgressPage/>},
            {path: 'profile', element: <ProfilePage/>},
        ],
    },
];

export const AppRoutes = () => {
    const element = useRoutes(routesConfig);
    return element;
};

