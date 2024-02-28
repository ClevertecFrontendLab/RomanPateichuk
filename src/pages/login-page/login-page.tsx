import React, {useCallback, useEffect, useState} from 'react'
import {useForm, Controller} from "react-hook-form"
import {
    useLoginMutation,
    useRegistrationMutation,
    useCheckEmailMutation
} from "@redux/api/authApi"

import {
    Button,
    Checkbox,
    Form,
    Input,
    Layout,
    Modal,
    Space, Spin,
    Tabs,
    TabsProps,
} from "antd";
import {
    GooglePlusOutlined,
} from '@ant-design/icons';

import {LogoFormIcon} from "@components/Icon/library.tsx";
import useMediaQuery from 'use-media-antd-query';
import styles from './login-page.module.scss'
import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Loader from "../../assets/loader.json"
import {getStorageItem} from "@utils/index.ts";
import {EComponentStatus} from "@types/components.ts";

export const Login: React.FC = () => {
    const [login, {isLoading}] = useLoginMutation();
    const [checkEmail, checkEmailResult] = useCheckEmailMutation()

    const prevLocation = useSelector(state => state.router.previousLocations[1]?.location.pathname)
    const navigate = useNavigate()

    const handleForgetPassword = useCallback(async (email: string, setError: () => void) => {
        if (!email) {
            setError('email', {type: 'pattern', message: ''});
            return;
        }
        localStorage.setItem('email', JSON.stringify(email))

        await checkEmail({
            "email": email
        })
            .unwrap()
            .then(() => {
                return navigate('/auth/confirm-email', {state: email})
            }).catch((e) => {
                if (e.status === EComponentStatus.S404) {
                    return navigate('/result/error-check-email-no-exist')
                } else {
                    return navigate('/result/error-check-email')
                }


            })

    }, [checkEmail, navigate])


    useEffect(() => {
        if (prevLocation === '/result/error-check-email') {
            handleForgetPassword(getStorageItem(localStorage, "email"))
        }
    }, [handleForgetPassword, prevLocation]);


    const handleFormSubmit = async (values) => {
        await login(values)
            .unwrap()
            .then((response) => {
                if (values.rememberMe) {
                    localStorage.setItem('token', JSON.stringify(response['accessToken']))
                } else {
                    sessionStorage.setItem('token', JSON.stringify(response['accessToken']))
                }
                return navigate('/main')
            }).catch(() => {
                return navigate('/result/error-login')
            })
    }

    const {control, setError, getValues, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange"
    })

    return (
        <div>

            <Form onSubmitCapture={handleSubmit(handleFormSubmit)} layout={'vertical'} name="login"
                  className={styles.login}>
                {isLoading && <Spin indicator={Loader} data-test-id="loader"/>}

                <Form.Item validateStatus={errors.email && 'error'}>
                    {checkEmailResult.isLoading && <Spin indicator={Loader} data-test-id="loader"/>}
                    <Controller name={'email'}
                                rules={{
                                    required: true,
                                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                }}
                                control={control}
                                render={({field}) =>
                                    <Input size={'large'} {...field} className={styles.email}
                                           data-test-id='login-email'
                                           addonBefore="e-mail:"/>}/>

                </Form.Item>
                <Form.Item validateStatus={errors.password && 'error'}>
                    <Controller name={'password'} rules={{
                        required: true,
                        pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                    }}
                                control={control}
                                render={({field}) =>
                                    <Input.Password {...field} size={'large'}
                                                    data-test-id='login-password'
                                                    placeholder="Пароль"></Input.Password>}/>

                </Form.Item>
                <Space direction={'horizontal'}>

                    <Controller name={'rememberMe'} control={control}
                                render={({field}) =>
                                    <Checkbox
                                        data-test-id='login-remember'
                                        {...field}>Запомнить меня</Checkbox>}
                    />


                    <Controller name={'forgetPassword'} control={control}
                                render={() => <Button
                                    data-test-id='login-forgot-button'
                                    disabled={!!errors.email}
                                    onClick={() => {
                                        handleForgetPassword(getValues('email'), setError)
                                    }} type="link">Забыли
                                    пароль?</Button>}
                    />


                </Space>
                <Button
                    data-test-id='login-submit-button'
                    size={'large'} type="primary" htmlType="submit">
                    Войти
                </Button>

                <Button size={'large'} icon={<GooglePlusOutlined/>}>Войти через
                    Google</Button>
            </Form>

        </div>
    )
}

export const SignUp: React.FC = () => {
    const [registration, {isLoading}] = useRegistrationMutation();
    const prevLocation = useSelector(state => state.router.previousLocations[1]?.location.pathname)


    const navigate = useNavigate()


    const handleFormSubmit = useCallback(async (values) => {
        localStorage.setItem('registrationData', JSON.stringify({
            email: values.email,
            password: values.password
        }))
        await registration(
            {
                email: values.email,
                password: values.password
            })
            .unwrap()
            .then(() => {
                return navigate('/result/success')
            }).catch(e => {
                if (e.status === EComponentStatus.S409) {
                    return navigate('/result/error-user-exist')
                } else {
                    return navigate('/result/error')
                }
            })
    }, [navigate, registration])
    const {control, getValues, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange"
    })

    useEffect(() => {
        if (prevLocation === '/result/error') {
            handleFormSubmit(getStorageItem(localStorage, 'registrationData'))
        }
    }, [handleFormSubmit, prevLocation]);

    return (
        <Form onSubmitCapture={handleSubmit(handleFormSubmit)} layout={'vertical'} name="signUp"
              className={styles.signup}>
            {isLoading && <Spin indicator={Loader} data-test-id="loader"/>}
            <Form.Item validateStatus={errors.email && 'error'}>
                <Controller name={'email'}
                            rules={{
                                required: true,
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            }}
                            control={control}
                            render={({field}) =>
                                <Input
                                    data-test-id='registration-email'
                                    size={'large'} {...field} className={styles.email}
                                    addonBefore="e-mail:"/>}/>

            </Form.Item>

            <Form.Item validateStatus={errors.password && 'error'}
                       help={'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
            >
                <Controller name={'password'} rules={{
                    required: true,
                    pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                }}
                            control={control}
                            render={({field}) =>
                                <Input.Password
                                    data-test-id='registration-password'
                                    {...field} size={'large'}
                                    placeholder="Пароль"></Input.Password>}/>

            </Form.Item>

            <Form.Item validateStatus={errors.password2 && 'error'}
                       help={errors.password2 && errors.password2?.message?.toString()}>
                <Controller name={'password2'} rules={
                    {
                        required: true,
                        validate: (value: string) => {
                            const {password} = getValues()
                            return password === value || 'Пароли не совпадают'
                        },
                    }
                }

                            control={control}
                            render={({field}) => <Input.Password
                                data-test-id='registration-confirm-password'
                                {...field} size={'large'}
                                placeholder="Повторите пароль"/>}
                >


                </Controller>

            </Form.Item>
            <Button
                data-test-id='registration-submit-button'
                size={'large'} type="primary"
                htmlType="submit">
                Войти
            </Button>
            <Button size={'large'} icon={<GooglePlusOutlined/>}>Регистрация через Google</Button>
        </Form>
    )
}


export const LoginPage: React.FC = () => {
    const size = useMediaQuery();
    const location = useLocation();
    const [tab, setTab] = useState<string>(location.pathname)

    const tabItems: TabsProps['items'] = [
        {
            key: '/auth',
            label: <NavLink className={styles.link} to={'/auth'}>Вход</NavLink>,
        },
        {
            key: '/auth/registration',
            label: <NavLink className={styles.link} to={'/auth/registration'}>Регистрация</NavLink>,
        },
    ]

    const calculateModalHeight = useCallback(() => {
        if (tab === '/auth') {
            return (size === 'xs') ? '612px' : '742px'
        } else {
            return (size === 'xs') ? '564px' : '686px'
        }
    }, [tab])

    const calculateTabsMargin = useCallback(() => {
        if (tab === '/auth') {
            return (size === 'xs') ? '0 0 1.5rem 0' : '0 0 1.5rem 0'
        } else {
            return (size === 'xs') ? '0 0 1.5rem 0' : '0 0 1.875rem 0'
        }
    }, [tab])


    return (
        <Layout className={styles.wrapper}>
            <Modal
                open={true}
                footer={null}
                closable={false}
                centered
                bodyStyle={{
                    height: calculateModalHeight()
                }}
                width={size === 'xs' ? 328 : 539}
            >
                <div className={styles.content}>
                    <LogoFormIcon className={styles.logo}/>
                    <Tabs
                        defaultActiveKey={tab}
                        items={tabItems}
                        tabBarStyle={{
                            width: '100%',
                            margin: calculateTabsMargin()
                        }}
                        onChange={(activeKey: string) => {
                            setTab(activeKey)
                        }}

                    />
                    <Outlet/>
                </div>
            </Modal>
        </Layout>
    )
}
