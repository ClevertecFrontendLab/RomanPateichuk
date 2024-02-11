import React, {useState} from 'react';
import s from './main-page.module.scss';
import {
    AndroidFilled, AppleFilled,
    HeartFilled,
    ProfileOutlined,
    SettingOutlined,
    TrophyOutlined
} from "@ant-design/icons";
import {Breadcrumb, Button, Layout, Menu, MenuProps, Space, Typography} from "antd";

import {
    CalendarIcon,
    CleverIcon,
    ExitIcon, FitIcon, LogoIcon,
    ProfileIcon,
    SwitcherIcon
} from "@components/Icon/library.tsx";

const { Header, Content, Sider } = Layout;

const {Link,Paragraph , Title, Text} = Typography;

export const MainPage: React.FC = () => {
    const [current, setCurrent] = useState<string>('');
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const [siderBreakpointXS, setSiderBreakpointXS ] = useState<boolean>(false)
    const items: MenuProps['items'] = [
            {
                label: 'Календарь',
                key: 'key1',
                icon: <CalendarIcon/>,
            },
            {
                label: 'Тренировки',
                key: 'key2',
                icon: <HeartFilled/>,
            },
            {
                label: 'Достижения',
                key: 'key3',
                icon: <TrophyOutlined/>
            },
            {
                label: 'Профиль',
                key: 'key4',
                icon: <ProfileIcon/>
            },
            {
                label: 'Выход',
                key: 'key5',
                icon: <ExitIcon/>

            },
        ]
    ;

    const onClickMenuHandler: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };


    return (
        <Layout className={s.wrapper}>
            <Sider className={s.aside} collapsed={collapsed}
                   breakpoint="xs"
                   width={siderBreakpointXS ? 106: 208}
                   trigger={null}
                   collapsedWidth={siderBreakpointXS ? 0 : 80}
                   onBreakpoint={() => {
                       setSiderBreakpointXS(prev=> !prev)
                   }}
                    style={{
                height: "100vh",
                position: "sticky",
                top: 0,
                left: 0,
            }}>
                <div className={s.logo}>
                    {siderBreakpointXS
                        ? <LogoIcon/>
                        : !collapsed
                        ? <><CleverIcon/><FitIcon/></>
                        : <FitIcon/>
                    }


                </div>
                <Menu className={s.menu} inlineCollapsed={collapsed} onClick={onClickMenuHandler}
                      selectedKeys={[current]} mode="vertical" items={items}/>
                <Button className={s.switcher} data-test-id="sider-switch" type="link"
                        onClick={() => setCollapsed((prev) => !prev)}>
                    <SwitcherIcon/>
                </Button>


            </Sider>
            <Layout style={{ minHeight: '100vh' }}>
                <Header className={s.header}>
                    <Breadcrumb className={s.breadcrumb}>
                        <Breadcrumb.Item className={s.item}>Главная</Breadcrumb.Item>
                    </Breadcrumb>
                    {/*<Button className={s.switcher} data-test-id="sider-switch-mobile" type="link"*/}
                    {/*        onClick={() => setCollapsed((prev) => !prev)}>*/}
                    {/*    SwitcherMobile*/}
                    {/*</Button>*/}
                    <Space className={s.header_block} align="start">
                        <Title level={1} className={s.title}>
                            Приветствуем тебя в CleverFit — приложении, которое поможет тебе
                            добиться
                            своей
                            мечты!
                        </Title>
                        <Button className={s.settings} type="link"
                                icon={<SettingOutlined/>}>Настройки</Button>
                    </Space>


                </Header>
                <Content className={s.main_wrapper}  >
                    <div className={s.main}>
                        <div className={s.content}>
                            <Paragraph className={s.description}>
                                С CleverFit ты сможешь:
                                <ul className={s.list}>
                                    <li className={s.item}>&mdash;&nbsp;&nbsp;планировать
                                        свои тренировки на календаре, выбирая тип
                                    и уровень нагрузки;
                                </li>
                                <li className={s.item}>&mdash;&nbsp;&nbsp;отслеживать
                                    свои достижения в разделе статистики,
                                    сравнивая свои результаты с нормами и рекордами;
                                </li>
                                <li className={s.item}>&mdash;&nbsp;&nbsp;создавать свой профиль, где ты можешь
                                    загружать свои
                                    фото, видео и отзывы о тренировках;
                                </li>
                                <li className={s.item}>&mdash;&nbsp;&nbsp;выполнять
                                    расписанные тренировки для разных частей
                                    тела, следуя подробным инструкциям и советам профессиональных
                                    тренеров.
                                </li>
                            </ul>
                        </Paragraph>
                        <Paragraph className={s.definition}>
                            CleverFit — это не просто приложение, а твой личный помощник в мире
                            фитнеса. Не
                            откладывай на завтра — начни тренироваться уже сегодня!
                        </Paragraph>
                        <div  className={s.tasks}>
                            <div className={s.item}>
                                <h2 className={s.title}>Расписать тренировки</h2>
                                <Button className={s.button} type="link" icon={<HeartFilled />}>Тренировки</Button>
                            </div>
                            <div className={s.item}>
                                <h2 className={s.title}>Назначить календарь</h2>
                                <Button className={s.button} type="link" icon={ <CalendarIcon/>}>Календарь</Button>
                            </div>
                            <div className={s.item}>
                                <h2 className={s.title}>Заполнить профиль</h2>
                                <Button className={s.button} type="link" icon={ <ProfileOutlined/>}>Профиль</Button>
                            </div>
                        </div>
                    </div>
                        <div className={s.bottom_block}>
                            <Space wrap={true} className={s.links_wrapper}>
                                <Link href="/" className={s.link}>
                                    Смотреть отзывы
                                </Link>
                            </Space>

                            <div className={s.download_block}>
                                <div className={s.download_section}>
                                    <Space direction="vertical">
                                        <Link className={s.link} href="/">Скачать на телефон</Link>
                                        <Text className={s.text}>Доступно в PRO-тарифe</Text>
                                    </Space>
                                </div>
                                <Space className={s.buttons}>
                                    <Button type="link" href="url://" icon={<AndroidFilled/>}>
                                        Android OS
                                    </Button>
                                    <Button type="link" href="url://" icon={<AppleFilled/>}>
                                        Apple iOS
                                    </Button>
                                </Space>


                            </div>
                        </div>

                    </div>

                </Content>
            </Layout>
        </Layout>
    );
};
