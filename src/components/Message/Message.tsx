import React, {ReactNode, useState} from "react";
import {Button, Layout, Modal, Typography} from "antd";

const {Title, Text} = Typography;
import s from './Message.module.scss'
import useMediaQuery from 'use-media-antd-query';
import {useNavigate} from "react-router-dom";

type PropsType = {
    isOpen: boolean
    title: string
    message: string
    actionText: string
    action: () => void
    url: string
    icon: ReactNode
}

export const Message: React.FC<PropsType> = (props) => {
    const {title, message, icon, actionText, action, isOpen, url} = props
    const size = useMediaQuery();

    const [open, setOpen] = useState<boolean>(isOpen)
    const navigate = useNavigate()

    const onClickHandler = () => {
        action && action()
        setOpen(false)
        return  navigate(url)
    }

    return (

        <Layout className={s.wrapper}>
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
                <Button onClick={onClickHandler} className={s.button} size={'large'}
                        type="primary">{actionText}</Button>
            </Modal>
        </Layout>
    )
}
