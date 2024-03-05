import Loader from "../../assets/loader.json";
import React, { useState} from 'react'
import classNames from 'classnames/bind';
import styles from './feedbacks-page.module.scss'
import {Avatar, Button, Rate, Spin} from "antd";
import {CreateFeedBackForm} from "@components/CreateFeedBackForm/CreateFeedBackForm.tsx";
import {EComponentStatus} from "@types/components.ts";
import {ErrorModal} from "@pages/feedbacks-page/ErrorModal.tsx";
import {StarFilled, StarOutlined, UserOutlined} from "@ant-design/icons";
import {SuccessModal} from "@pages/feedbacks-page/SuccessModal.tsx";
import {Typography} from 'antd';
import {setShowFeedBacksModal} from "@redux/feedbacksSlice.ts";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {useDispatch} from "react-redux";
import {useGetFeedBackQuery} from "@redux/api/feedBackApi.ts";
import {useNavigate} from "react-router-dom";
import {ErrorStatusModal} from "@components/ErrorStatusModal/ErrorStatusModal.tsx";

const {Text, Title, Paragraph} = Typography;

export interface FeedBackType {
    id: string
    fullName: null | string
    imageSrc: null | string
    message: string
    rating: number
    createdAt: string
}

export const FeedbacksPage: React.FC = React.memo(() => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [buttonText, setButtonText] = useState('Развернуть все отзывы')
    const {data = [], isLoading, isError, error} = useGetFeedBackQuery('')
    const [isOpenAllFeedBacks, setIsOpenAllFeedBacks] = useState(false)
    const cx = classNames.bind(styles);
    const showFeedBackForm = useAppSelector(state=> state.feedbacks.isShowModal)
    const status = useAppSelector(state=> state.app.status)

    const FeedbacksPageClassName = cx({
        wrapper: true,
        open: isOpenAllFeedBacks,
        hideButtons: data.length === 0
    })

    if (isError) {
        if (error.status === EComponentStatus.S403) {
            sessionStorage.removeItem("token");
            localStorage.removeItem("token");
            return navigate('/auth')

        } else {
            return <ErrorStatusModal/>
        }
    }


    const switchShowFeedbacks = () => {
        setButtonText(buttonText === 'Развернуть все отзывы' ? 'Свернуть все отзывы' : 'Развернуть все отзывы')
        setIsOpenAllFeedBacks((prev) => !prev)
    }


    return (
        <>
            {isLoading ?
                <Spin indicator={Loader} data-test-id="loader"/> :
                <div className={FeedbacksPageClassName}>
                    {showFeedBackForm &&
                        <CreateFeedBackForm />}
                    {status === 'error' && <ErrorModal/>}
                    {status === 'success' && <SuccessModal/>}

                    {data.length ? <div className={styles.feedbacksBlock}>
                            {
                                data.map((feedback: FeedBackType) => {
                                    let fullName = ['', '']
                                    if (feedback.fullName) {
                                        fullName = feedback.fullName.split(' ')
                                    }

                                    return <div className={styles.feedback} key={feedback.id}>
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
                                            <Text
                                                className={styles.date}>{String(feedback.createdAt.match(/\d{4}-\d{2}-\d{2}/)).split('-').reverse().join('.')}</Text>
                                            <Text className={styles.message}>{feedback.message}</Text>
                                        </div>
                                    </div>
                                }).reverse()
                            }
                        </div>
                        : <div className={styles.noFeedbacksBlock}>
                            <div className={styles.content}>
                                <Title className={styles.title}>Оставьте свой отзыв первым</Title>
                                <Text className={styles.text}>Вы можете быть первым, кто оставит
                                    отзыв об этом фитнесс приложении. Поделитесь своим мнением и
                                    опытом с другими пользователями, и помогите им сделать
                                    правильный выбор.</Text>
                            </div>
                        </div>}

                    <Button data-test-id='write-review' className={styles.createFeedbackBtn}
                            type={'primary'} onClick={()=>{dispatch(setShowFeedBacksModal(true))}}>Написать отзыв</Button>
                    <Button type={'link'} data-test-id='all-reviews-button'
                            className={styles.switchShowFeedbacksBtn}
                            onClick={switchShowFeedbacks}>{buttonText}</Button>


                </div>}
        </>
    )
})
