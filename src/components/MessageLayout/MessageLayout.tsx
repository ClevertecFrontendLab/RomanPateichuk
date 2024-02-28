import React, {ReactNode, useState} from "react";
import {Button, Layout, Modal, Typography} from "antd";

const {Title, Text} = Typography;
import styles from './MessageLayout.module.scss'
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

export const MessageLayout: React.FC<PropsType> = ({title, testId, message, icon, actionText, isOpen, url}) => {
    const size = useMediaQuery();

    const [open, setOpen] = useState(isOpen)
    const navigate = useNavigate()

    const onClickHandler = () => {
        setOpen(false)

        if(url){
            return navigate(url)
        }

    }

    return (

        <Layout className={styles.wrapper}>
            <Modal
                open={open}
                footer={null}
                closable={false}
                centered
                bodyStyle={{height: size === 'xs' ? '315px' : '363px'}}
                width={size === 'xs' ? 328 : 539}
            >
                {icon}
                <div className={styles.middle}>
                    <Title className={styles.title} level={3}>{title}</Title>
                    <Text className={styles.message}>{message}</Text>
                </div>
                <Button data-test-id={testId} onClick={onClickHandler} className={styles.button} size={'large'}
                        type="primary">{actionText}</Button>
            </Modal>
        </Layout>
    )
}
