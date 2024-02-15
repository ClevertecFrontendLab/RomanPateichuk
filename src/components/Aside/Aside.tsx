import React, {useState} from "react";
import s from "./Aside.module.scss";
import {Button, Layout, Menu, MenuProps} from "antd";
import {
    CalendarIcon,
    CleverIcon, ExitIcon, FitIcon,
    LogoIcon, ProfileIcon,
    SwitcherDesktopIconClose, SwitcherDesktopIconOpen,
    SwitcherMobileIconClose,
    SwitcherMobileIconOpen
} from "@components/Icon/library.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {HeartFilled, TrophyOutlined} from "@ant-design/icons";
const {Sider} = Layout;


export const Aside:React.FC = ()=> {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const [siderBreakpointXS, setSiderBreakpointXS] = useState<boolean>(false)

    const Logo = () => (<div className={s.logo}>{siderBreakpointXS ? <LogoIcon/> : !collapsed ? <>
        <CleverIcon/><FitIcon/></> : <FitIcon/>}</div>)

    const navigate = useNavigate()

    const location = useLocation()



    const menuItems: MenuProps['items'] = [
            {
                label: 'Календарь',
                key: 'calendar',
                icon: <CalendarIcon/>,
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
                icon: <ProfileIcon/>
            },
            {
                label: 'Выход',
                key: 'logout',
                icon: <ExitIcon/>

            },
        ]
    ;

    const onClickMenuHandler: MenuProps['onClick'] = (e) => {
        if(e.key === 'logout')
            alert('logout')
        else
            navigate(e.key)
    };

    return <Sider className={s.aside} collapsed={collapsed}
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
        {Logo()}
        <Menu className={s.menu}
              onClick={onClickMenuHandler}
              defaultSelectedKeys={[location.pathname.slice(1)]}
              mode="vertical" items={menuItems}/>
        {
            siderBreakpointXS ?
                <Button className={s.switcher} type="link"
                        data-test-id="sider-switch-mobile"
                        onClick={() => setCollapsed((prev) => !prev)}>
                    {!collapsed ? <SwitcherMobileIconClose/> : <SwitcherMobileIconOpen/>}
                </Button> :
                <Button className={s.switcher} type="link" data-test-id="sider-switch"
                        onClick={() => setCollapsed((prev) => !prev)}>
                    {!collapsed ? <SwitcherDesktopIconClose/> : <SwitcherDesktopIconOpen/>}
                </Button>
        }


    </Sider>
}
