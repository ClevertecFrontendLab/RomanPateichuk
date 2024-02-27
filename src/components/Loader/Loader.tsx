import React from "react"
import loader from "../../assets/loader.json"
import Lottie from 'lottie-react'
import s from "./Loader.module.scss"

export const Loader: React.FC = ()=>{
    return (
        <div className={s.wrapper}>
            <Lottie
            width={150}
            height={150}
            animationData={loader}
            loop={true}
            className={s.loader}
            />
        </div>
    )
}
