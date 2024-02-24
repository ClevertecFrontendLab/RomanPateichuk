import React, {useState} from 'react'
import {useForm, Controller} from "react-hook-form"

import {
    Button,
    Checkbox,
    Form,
    Input,
    Layout,
    Modal,
    Space,
    Tabs,
    TabsProps,
} from "antd";
import {
    GooglePlusOutlined,
} from '@ant-design/icons';

import {LogoFormIcon, SuccessIcon, WarningIcon} from "@components/Icon/library.tsx";
import useMediaQuery from 'use-media-antd-query';
import s from './login-page.module.scss'
import {Message} from "@components/Message/Message.tsx";

import {ErrorIcon} from "@components/Icon/library.tsx";
import {NavLink, Outlet, useLocation} from "react-router-dom";


export const Login: React.FC = () => {
    const handleFormSubmit = (values: any) => {
        console.log(values)
    }

    const {control, handleSubmit, formState: {errors}} = useForm()

    return (
        <Form onSubmitCapture={handleSubmit(handleFormSubmit)} layout={'vertical'} name="login"
              className={s.login}>
            <Form.Item validateStatus={errors.email && 'error'}>
                <Controller name={'email'}
                            rules={{required: true,}}
                            control={control}
                            render={({field}) =>
                                <Input size={'large'} {...field} className={s.email}
                                       addonBefore="e-mail:"/>}/>

            </Form.Item>

            <Form.Item validateStatus={errors.password && 'error'}>
                <Controller name={'password'} rules={{required: true}} control={control}
                            render={({field}) =>
                                <Input.Password {...field} size={'large'}
                                                placeholder="Пароль"></Input.Password>}/>

            </Form.Item>

            <Space direction={'horizontal'}>
                <Checkbox>Запомнить меня</Checkbox>
                <Button type="link">Забыли пароль?</Button>
            </Space>
            <Button size={'large'} type="primary" htmlType="submit">
                Войти
            </Button>
            <Button size={'large'} icon={<GooglePlusOutlined/>}>Войти через Google</Button>
        </Form>
    )
}

export const SignUp: React.FC = () => {
    const {control, getValues, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange"
    })
    const handleFormSubmit = (value: any) => {
        alert(value)
    }
    return (
        <Form onSubmitCapture={handleSubmit(handleFormSubmit)} layout={'vertical'} name="signUp"
              className={s.signup}>
            <Form.Item validateStatus={errors.email && 'error'}>
                <Controller name={'email'}
                            rules={{
                                required: true,
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            }}
                            control={control}
                            render={({field}) =>
                                <Input size={'large'} {...field} className={s.email}
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
                                <Input.Password  {...field} size={'large'}
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
                            render={({field}) => <Input.Password {...field} size={'large'}
                                                                 placeholder="Повторите пароль"/>}
                >


                </Controller>

            </Form.Item>
            <Button disabled={Object.keys(errors).length > 0} size={'large'} type="primary"
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
            label: <NavLink to={'/auth'}>Вход</NavLink>,
        },
        {
            key: '/auth/registration',
            label: <NavLink to={'registration'}>Регистрация</NavLink>,
        },
    ]


    return (
        <Layout className={s.wrapper}>
            <Modal
                open={true}
                footer={null}
                closable={false}
                centered
                bodyStyle={{
                    height: (tab === '/auth') ? (size === 'xs') ? '612px' : '742px' : (size === 'xs') ? '564px' : '686px'

                }}
                width={size === 'xs' ? 328 : 539}
            >
                <div className={s.content}>
                    <LogoFormIcon className={s.logo}/>
                    <Tabs
                        defaultActiveKey={tab}
                        items={tabItems}
                        tabBarStyle={{
                            width: '100%',
                            margin: (tab === '/auth')
                                ? (size === 'xs') ? '0 0 1.5rem 0' : '0 0 1.5rem 0' : (size === 'xs') ? '0 0 1.5rem 0' : '0 0 1.875rem 0'
                        }}
                        onChange={(activeKey: string) => {
                            setTab(activeKey)
                        }}

                    />
                    <Outlet/>
                </div>
            </Modal>
            <Message
                isOpen={false}
                icon={<ErrorIcon/>}
                message={'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'}
                title={'Данные не сохранились'}
                actionText={'Назад к регистрации'}
                action={() => {
                    alert('Назад к регистрации')
                }}
            />
            <Message
                isOpen={false}
                icon={<WarningIcon/>}
                message={'Что-то пошло не так. Попробуйте еще раз'}
                title={'Вход не выполнен'}
                actionText={'Повторить'}
                action={() => {
                    alert('Повторить')
                }}
            />
            <Message
                isOpen={false}
                icon={<SuccessIcon/>}
                message={'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'}
                title={'Регистрация успешна'}
                actionText={'Войти'}
                action={() => {
                    alert('Войти')
                }}
            />
        </Layout>
    )
}
