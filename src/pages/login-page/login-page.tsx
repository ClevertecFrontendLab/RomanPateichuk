import React, {useCallback, useState} from 'react'

import {
    Layout,
    Modal,
    Tabs,
    TabsProps,
} from "antd";

import {LogoFormIcon} from "@components/Icon/library.tsx";
import useMediaQuery from 'use-media-antd-query';
import styles from './login-page.module.scss'
import {NavLink, Outlet, useLocation} from "react-router-dom";

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
    }, [tab, size])

    const calculateTabsMargin = useCallback(() => {
        if (tab === '/auth') {
            return (size === 'xs') ? '0 0 1.5rem 0' : '0 0 1.5rem 0'
        } else {
            return (size === 'xs') ? '0 0 1.5rem 0' : '0 0 1.875rem 0'
        }
    }, [tab, size])


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
