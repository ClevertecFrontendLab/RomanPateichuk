import React, {useState} from 'react'
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


const Login: React.FC = () => {
    const onClickHandler = () => {
        alert('Login')
    }
    return (
        <Form layout={'vertical'} name="login" className={s.login}>
           <Form.Item name={'email'}>
               <Input className={s.email} size={'large'} addonBefore="e-mail:"></Input>
           </Form.Item>

            <Form.Item name={'password'}>
                <Input.Password size={'large'} placeholder="Пароль"></Input.Password>
            </Form.Item>

            <Space direction={'horizontal'}>
                <Checkbox>Запомнить меня</Checkbox>
                <Button type="link">Забыли пароль?</Button>
            </Space>
            <Button size={'large'} onClick={onClickHandler} type="primary" htmlType="submit">
                Войти
            </Button>
            <Button size={'large'} icon={<GooglePlusOutlined/>}>Войти через Google</Button>
        </Form>
    )
}

const SignUp: React.FC = () => {
    const onClickHandler = () => {
        alert('SignUp')
    }
    return (
        <Form layout={'vertical'}  name="signUp" className={s.signup}>
            <Form.Item name={'email'}>
            <Input size={'large'} className={s.email} addonBefore="e-mail:"></Input>
            </Form.Item>

            <Form.Item
                name={'password'}
                help="Пароль не менее 8 символов, с заглавной буквой и цифрой">
                <Input.Password size={'large'} placeholder="Пароль"></Input.Password>
            </Form.Item>
            <Form.Item name={'password2'}>
            <Input.Password size={'large'} placeholder="Повторите пароль"></Input.Password>
            </Form.Item>
                <Button size={'large'} onClick={onClickHandler} type="primary" htmlType="submit">
                Войти
            </Button>
            <Button size={'large'} icon={<GooglePlusOutlined/>}>Регистрация через Google</Button>
        </Form>
    )
}


export const LoginPage: React.FC = () => {
    const size = useMediaQuery();
    const [tab, setTab] = useState<string>('login')
    const tabItems: TabsProps['items'] = [
        {
            key: 'login',
            label: 'Вход',
            children: <Login/>,
        },
        {
            key: 'signup',
            label: 'Регистрация',
            children: <SignUp/>,
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
                    height: (tab === 'login') ? (size === 'xs') ? '612px' : '742px' : (size === 'xs') ? '564px' : '686px'

                }}
                width={size === 'xs' ? 328 : 539}
            >
                <div className={s.content}>
                    <LogoFormIcon className={s.logo}/>
                    <Tabs
                        defaultActiveKey="login"
                        items={tabItems}
                        tabBarStyle={{
                            width: '100%',
                            margin: (tab === 'login')
                                ? (size === 'xs') ? '0 0 1.5rem 0' : '0 0 1.5rem 0' : (size === 'xs') ? '0 0 1.5rem 0' : '0 0 1.875rem 0'
                        }}
                        onChange={(activeKey: string) => {
                            setTab(activeKey)
                        }}

                    />
                </div>
            </Modal>
            <Message
                open={false}
                icon={<ErrorIcon/>}
                message={'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'}
                title={'Данные не сохранились'}
                action={'Назад к регистрации'}
            />
            <Message
                open={false}
                icon={<WarningIcon/>}
                message={'Что-то пошло не так. Попробуйте еще раз'}
                title={'Вход не выполнен'}
                action={'Повторить'}
            />
            <Message
                open={false}
                icon={<SuccessIcon/>}
                message={'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'}
                title={'Регистрация успешна'}
                action={'Войти'}
            />
        </Layout>
    )
}
