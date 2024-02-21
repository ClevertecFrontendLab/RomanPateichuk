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

import {LogoFormIcon} from "@components/Icon/library.tsx";
import useMediaQuery from 'use-media-antd-query';
import s from './login-page.module.scss'
import {Message} from "@components/Message/Message.tsx";

import {ErrorIcon} from "@components/Icon/library.tsx";


const Login: React.FC = () => {
    const onClickHandler = () => {
        alert('Login')
    }
    return (
        <div className={s.login}>
            <Input className={s.email} size={'large'} addonBefore="e-mail:"></Input>
            <Input.Password size={'large'} placeholder="Пароль"></Input.Password>
            <Space direction={'horizontal'}>
                <Checkbox>Запомнить меня</Checkbox>
                <Button type="link">Забыли пароль?</Button>
            </Space>
            <Button size={'large'} onClick={onClickHandler} type="primary" htmlType="submit">
                Войти
            </Button>
            <Button size={'large'} icon={<GooglePlusOutlined/>}>Войти через Google</Button>
        </div>
    )
}

const SignUp: React.FC = () => {
    const onClickHandler = () => {
        alert('SignUp')
    }
    return (
        <div className={s.signup}>
            <Input size={'large'} className={s.email} addonBefore="e-mail:"></Input>
            <Input.Password size={'large'} placeholder="Пароль"></Input.Password>
            <Input.Password size={'large'} placeholder="Повторите пароль"></Input.Password>
            <Button size={'large'} onClick={onClickHandler} type="primary" htmlType="submit">
                Войти
            </Button>
            <Button size={'large'} icon={<GooglePlusOutlined/>}>Регистрация через Google</Button>
        </div>
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
            key: 'signUp',
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
                <Form className={s.form} layout={'vertical'}>
                    <LogoFormIcon className={s.logo}/>
                    <Tabs
                        defaultActiveKey="1"
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
                </Form>
            </Modal>
            <Message
                open={false}
                icon={<ErrorIcon/>}
                message={'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'}
                title={'Данные не сохранились'}
                action={'Назад к регистрации'}
            />
        </Layout>
    )
}
