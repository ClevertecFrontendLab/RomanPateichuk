import React, {useState} from "react";
import styles from "./Aside.module.scss";
import {Button, Layout, Menu, MenuProps} from "antd";
import {

    ExitIcon,

} from "@components/Icon/library.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {
    HeartFilled, TrophyOutlined, MenuFoldOutlined,
    MenuUnfoldOutlined, CalendarTwoTone, IdcardOutlined
} from "@ant-design/icons";
import {Logo} from "@components/Logo/Logo.tsx";

const {Sider} = Layout;


export const Aside: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const [siderBreakpointXS, setSiderBreakpointXS] = useState<boolean>(false)


    const navigate = useNavigate()

    const location = useLocation()


    const menuItems: MenuProps['items'] = [
            {
                label: 'Календарь',
                key: 'calendar',
                icon: <CalendarTwoTone twoToneColor={'var(--color-menu-button-icon)'}/>,
            },
            {
                label: 'Тренировки',
                key: 'training',
                icon: <HeartFilled/>,
            },
            {
                label: 'Достижения',
                key: 'progress',
                icon: <TrophyOutlined/>
            },
            {
                label: 'Профиль',
                key: 'profile',
                icon: <IdcardOutlined/>
            },
            {
                label: 'Выход',
                key: 'logout',
                icon: <ExitIcon/>

            },
        ]
    ;

    const onClickMenuHandler: MenuProps['onClick'] = (e) => {
        if (e.key === 'logout')
        {
            sessionStorage.removeItem("token");
            localStorage.removeItem("token");
            navigate('/auth')
        }
        else
            navigate(e.key)
    };

    return <Sider className={styles.aside} collapsed={collapsed}
                  breakpoint="xs"
                  width={siderBreakpointXS ? 106 : 208}
                  trigger={null}
                  collapsedWidth={siderBreakpointXS ? 0 : 64}
                  onBreakpoint={(breakPoint) => {
                      setSiderBreakpointXS(breakPoint)
                  }}
                  style={{
                      height: "100vh",
                      position: siderBreakpointXS ? "absolute" : "sticky",
                      top: 0,
                      left: 0
                  }}

    >
        <Logo siderBreakpointXS={siderBreakpointXS} collapsed={collapsed} />
        <Menu className={styles.menu}
              onClick={onClickMenuHandler}
              defaultSelectedKeys={[location.pathname.slice(1)]}
              mode="vertical" items={menuItems}/>
        {

            <Button className={styles.switcher} type="link"
                    data-test-id={siderBreakpointXS ? "sider-switch-mobile" : "sider-switch"}
                    onClick={() => setCollapsed((prev) => !prev)}>
                {
                    !collapsed ? <MenuFoldOutlined/> : <MenuUnfoldOutlined/>
                }
            </Button>
        }


    </Sider>
}
