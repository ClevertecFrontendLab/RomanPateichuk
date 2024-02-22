import React, {ReactNode, useState} from "react";
import {Button, Modal, Typography} from "antd";

const {Title, Text} = Typography;
import s from './Message.module.scss'
import useMediaQuery from 'use-media-antd-query';

type PropsType = {
    isOpen: boolean
    title: string
    message: string
    actionText: string
    action: ()=>void
    icon: ReactNode
}

export const Message: React.FC<PropsType> = (props) => {
    const {title, message, icon, actionText, action, isOpen} = props
    const size = useMediaQuery();

    const [open, setOpen] = useState<boolean>(isOpen)

    const onClickHandler = ()=>{
        action && action()
        setOpen(false)
    }

    return (
        <Modal
            open={open}
            footer={null}
            closable={false}
            centered
            bodyStyle={{height: size === 'xs' ? '315px' : '363px'}}
            width={size === 'xs' ? 328 : 539}
        >
            {icon}
            <div className={s.middle}>
                <Title className={s.title} level={3}>{title}</Title>
                <Text className={s.message}>{message}</Text>
            </div>
            <Button onClick={onClickHandler} className={s.button} size={'large'} type="primary">{actionText}</Button>
        </Modal>
    )
}
