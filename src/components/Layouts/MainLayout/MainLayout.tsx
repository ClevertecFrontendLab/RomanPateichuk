import React from 'react';
import {Breadcrumb, Layout} from "antd";

import {Outlet} from "react-router-dom";
import {Aside} from "@components/Aside";
import styles from "./MainLayout.module.scss";

export const MainLayout: React.FC = () => {

    return (
        <Layout style={{minHeight: '100vh'}}>
           <Aside/>
            <Layout>
                <Breadcrumb className={styles.breadcrumb}>
                    <Breadcrumb.Item>Главная</Breadcrumb.Item>
                </Breadcrumb>
                <Outlet/>
            </Layout>
        </Layout>
    );
};
