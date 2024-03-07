import React from "react"
import loader from "../../assets/loader.json"
import Lottie from 'lottie-react'
import styles from "./Loader.module.scss"
import {Spin} from "antd";

export const Loader: React.FC = ()=> (
    <Spin indicator={<div className={styles.loader}>
        <Lottie
            animationData={loader}
            loop={true}
        />
    </div>} data-test-id="loader"/>)

