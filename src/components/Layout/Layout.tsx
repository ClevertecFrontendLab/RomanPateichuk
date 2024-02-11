import React from 'react';
import { Layout} from "antd";

import {Outlet} from "react-router-dom";
import {HeaderComponent as Header} from "@components/Header";
import {Aside} from "@components/Aside";

export const LayoutComponent: React.FC = () => {
    return (
        <Layout style={{minHeight: '100vh'}}>
           <Aside/>
            <Layout>
                <Header/>
                <Outlet/>
            </Layout>
        </Layout>
    );
};
