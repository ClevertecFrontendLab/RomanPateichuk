import React from 'react'
import s from "./Header.module.scss";
import {Breadcrumb, Button, Layout, Space, Typography} from "antd";
import {SettingOutlined} from "@ant-design/icons";

const {Title} = Typography;
const {Header} = Layout;


export const HeaderComponent: React.FC = () => (
    <Header className={s.header}>
        <Breadcrumb className={s.breadcrumb}>
            <Breadcrumb.Item className={s.item}>Главная</Breadcrumb.Item>
        </Breadcrumb>
        <Space className={s.header_block} align="start">
            <Title level={1} className={s.title}>
                Приветствуем тебя в CleverFit — приложении, <><br/></>которое поможет
                тебе
                добиться
                своей
                мечты!
            </Title>
            <Button className={s.settings} type="link"
                    icon={<SettingOutlined/>}>Настройки</Button>
        </Space>
    </Header>
)
