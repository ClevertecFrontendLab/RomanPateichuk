import React from 'react'
import styles from "./Header.module.scss";
import {Breadcrumb, Button, Layout, Space, Typography} from "antd";
import {SettingOutlined} from "@ant-design/icons";


const {Title} = Typography;
const {Header} = Layout;


export const HeaderComponent: React.FC = () => (
    <Header className={styles.header}>
        <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item className={styles.item}>Главная</Breadcrumb.Item>
        </Breadcrumb>
        <Space className={styles.header_block} align="start">
            <Title level={1} className={styles.title}>
                Приветствуем тебя в CleverFit — приложении, <><br/></>которое поможет
                тебе
                добиться
                своей
                мечты!
            </Title>
            <Button className={styles.settings} type="link"
                    icon={<SettingOutlined/>}>Настройки</Button>
        </Space>
    </Header>
)
