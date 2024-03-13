import React from "react";
import {Avatar, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import styles from './FeedBack.module.scss'
import {CustomRate} from "@components/Rate";
const {Text, Paragraph} = Typography;

export interface FeedBackSchema{
    "id": string,
    fullName: string | null,
    "imageSrc": string | null,
    "message": string | null,
    "rating": number,
    "createdAt": string

}

interface FeedBackComponentProps {
    feedback: FeedBackSchema,
}

export const FeedBack: React.FC<FeedBackComponentProps> = (props)=>{
    const {feedback} = props

    let fullName = ['', '']
    if (feedback.fullName) {
        fullName = feedback.fullName.split(' ')
    }


    return (
        <div className={styles.feedback}>
            <div className={styles.avatarBlock}>
                <Avatar className={styles.avatar} alt={'avatar'}
                        src={feedback.imageSrc}
                        icon={<UserOutlined
                            className={styles.avatarIcon}/>}/>
                <Paragraph className={styles.fullName}>
                    <Text>{fullName[0]}</Text>
                    <Text>{fullName[1]}</Text>
                </Paragraph>
            </div>
            <div className={styles.messageBlock}>
                <CustomRate
                    value={feedback.rating}
                    disabled={true}
                    size={'1rem'}
                />
                <Text className={styles.date}>{String(feedback.createdAt.match(/\d{4}-\d{2}-\d{2}/)).split('-').reverse().join('.')}</Text>
                <Text className={styles.message}>{feedback.message}</Text>
            </div>
        </div>
    )
}
