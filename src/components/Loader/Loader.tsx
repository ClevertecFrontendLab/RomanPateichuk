import React from "react"
import loader from "../../assets/loader.json"
import Lottie from 'lottie-react'
import styles from "./Loader.module.scss"

export const Loader: React.FC = ()=> (
        <div className={styles.wrapper}>
            <Lottie
            width={150}
            height={150}
            animationData={loader}
            loop={true}
            />
        </div>)

