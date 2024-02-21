import React, {ReactNode} from "react";
import {Button, Modal, Typography} from "antd";

const {Title, Text} = Typography;
import s from './Message.module.scss'
import useMediaQuery from 'use-media-antd-query';

type PropsType = {
    open: boolean
    title: string
    message: string
    action: string
    icon: ReactNode
}

export const Message: React.FC<PropsType> = (props) => {
    const {title, message, icon, action, open} = props
    const size = useMediaQuery();
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
            <Button className={s.button} size={'large'} type="primary">{action}</Button>
        </Modal>
    )
}
