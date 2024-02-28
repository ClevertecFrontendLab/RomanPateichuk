import React from "react";
import styles from "./Logo.module.scss";
import {CleverIcon, FitIcon, LogoIcon} from "@components/Icon/library.tsx";

type LogoPropType = {
    siderBreakpointXS: boolean
    collapsed: boolean
}

export const Logo: React.FC<LogoPropType> = (props) =>{
    const {siderBreakpointXS, collapsed} = props

    return <div className={styles.logo}>{siderBreakpointXS ? <LogoIcon/> : !collapsed ? <>
        <CleverIcon/><FitIcon/></> : <FitIcon/>}</div>
}
