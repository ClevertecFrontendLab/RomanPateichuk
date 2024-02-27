import React, {ReactNode, useState} from "react";
import {Button, Layout, Modal, Typography} from "antd";

const {Title, Text} = Typography;
import s from './MessageLayout.module.scss'
import useMediaQuery from 'use-media-antd-query';
import {useNavigate} from "react-router-dom";

type PropsType = {
    isOpen: boolean
    title: string
    message: string
    actionText: string
    url: string
    icon: ReactNode
    testId: string,
}

export const MessageLayout: React.FC<PropsType> = (props) => {
    const {title, testId, message, icon, actionText, isOpen, url} = props
    const size = useMediaQuery();

    const [open, setOpen] = useState<boolean>(isOpen)
    const navigate = useNavigate()

    const onClickHandler = () => {
        setOpen(false)

        if(url){
            return navigate(url)
        }

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
                <Button data-test-id={testId} onClick={onClickHandler} className={s.button} size={'large'}
                        type="primary">{actionText}</Button>
            </Modal>
        </Layout>
    )
}
