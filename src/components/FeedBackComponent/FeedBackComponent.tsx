import React from "react";
import {Avatar, Rate, Typography} from "antd";
import {StarFilled, StarOutlined, UserOutlined} from "@ant-design/icons";
import styles from './FeedBackComponent.module.scss'
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

export const FeedBackComponent: React.FC<FeedBackComponentProps> = (props)=>{
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
                <Rate className={styles.rate} count={5} disabled
                      value={feedback.rating}
                      character={({index, value}) => {
                          if (index + 1 <= value) {
                              return <StarFilled
                                  className={styles.starIcon}/>;
                          } else {
                              return <StarOutlined
                                  className={styles.starIcon}/>;
                          }
                      }}
                />
                <Text className={styles.date}>{String(feedback.createdAt.match(/\d{4}-\d{2}-\d{2}/)).split('-').reverse().join('.')}</Text>
                <Text className={styles.message}>{feedback.message}</Text>
            </div>
        </div>
    )
}
