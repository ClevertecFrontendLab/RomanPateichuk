import React, {useCallback, useState} from 'react'
import styles from './feedbacks-page.module.scss'
import {useGetFeedBackQuery} from "@redux/api/feedBackApi.ts";
import {Avatar, Button, Modal, Rate, Result, Space, Spin} from "antd";
import {StarFilled, StarOutlined, UserOutlined} from "@ant-design/icons";
import {EComponentStatus} from "@types/components.ts";
import {useNavigate} from "react-router-dom";
import Loader from "../../assets/loader.json";
import {CreateFeedBackForm} from "@components/CreateFeedBackForm/CreateFeedBackForm.tsx";
import {Typography} from 'antd';
import classNames from 'classnames/bind';
import {SuccessModal} from "@pages/feedbacks-page/SuccessModal.tsx";
import {ErrorModal} from "@pages/feedbacks-page/ErrorModal.tsx";
import useMediaQuery from "use-media-antd-query";

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
    const [showFeedBackForm, setShowFeedBackForm] = useState(false)
    const [buttonText, setButtonText] = useState('Развернуть все отзывы')
    const {data = [], isLoading, isError, error} = useGetFeedBackQuery('')
    const [status, setStatus] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()
    const size = useMediaQuery();
    const calculateModalHeight = useCallback(() => {
        return (size === 'xs') ? '281px' : '345px'
    }, [size])
    const cx = classNames.bind(styles);

    const FeedbacksPageClassName = cx({
        wrapper: true,
        open: isOpen,
        hideButtons: data.length === 0
    })

    const onClickResultHandler = () => {
        return navigate('/main')

    }

    const createFeedback = () => {
        setShowFeedBackForm(true)
    }

    const isOpenCallBack = (value: boolean) => {
        setShowFeedBackForm(value)
    }

    const getStatus = (status: string) => {
        setStatus(status)
    }


    if (isError) {
        if (error.status === EComponentStatus.S403) {
            sessionStorage.removeItem("token");
            localStorage.removeItem("token");
            return navigate('/auth')

        } else {
            return <Result title={'что-то пошло не так'}
                           subTitle={'Произошла ошибка, попробуйте ещё раз.'}
                           status={'500'}
                           testId={''}
                           extra={<Button type="primary"
                                          onClick={onClickResultHandler}>Назад</Button>}
            />
        }

    }


    const switchShowFeedbacks = () => {
        setButtonText(buttonText === 'Развернуть все отзывы' ? 'Свернуть все отзывы' : 'Развернуть все отзывы')
        setIsOpen((prev) => !prev)
    }

    const errorHandler = () => {
        setStatus('')
        createFeedback()
    }


    return (
        <>
            {isLoading ?
                <Spin indicator={Loader} data-test-id="loader"/> :
                <div className={FeedbacksPageClassName}>
                    {showFeedBackForm &&
                        <CreateFeedBackForm isOpenCallBack={isOpenCallBack} getStatus={getStatus}/>}
                    {/* to do */}
                    {status === 'error' && <Modal open={true}
                                                  footer={null}
                                                  closable={false}
                                                  centered
                                                  maskStyle={{
                                                      backgroundColor: 'rgba(121, 156, 213, 0.5)',
                                                      backdropFilter: 'blur(5px)'
                                                  }}
                                                  width={size === 'xs' ? 328 : 539}
                                                  bodyStyle={{
                                                      padding: size === 'xs' ? '0 16px' : '0px 85.5px',
                                                      height: calculateModalHeight(),
                                                      justifyContent: 'center'
                                                  }}
                    >
                        <Result
                            title={'Данные не сохранились'}
                            subTitle={'Что-то пошло не так. Попробуйте еще раз'}
                            status={'error'}
                            style={{padding: '0'}}

                        />
                        <Space
                            direction={'horizontal'}
                            style={{marginTop: '24px', width: '100%'}}
                        >
                            <Button data-test-id='write-review-not-saved-modal'
                                    style={{
                                        height: '40px',
                                        width: size === 'xs' ? '144px' : '180px'
                                    }}
                                    type="primary" onClick={errorHandler}>Написать
                                отзыв</Button>
                            <Button
                                style={{height: '40px', width: size === 'xs' ? '144px' : '180px'}}
                                onClick={() => {
                                    setStatus('');
                                    setShowFeedBackForm(false)
                                }}>Закрыть</Button>
                        </Space>
                    </Modal>}

                    {status === 'success' && <Modal open={true}
                                                    footer={null}
                                                    closable={false}
                                                    centered
                                                    maskStyle={{
                                                        backgroundColor: 'rgba(121, 156, 213, 0.5)',
                                                        backdropFilter: 'blur(5px)'
                                                    }}
                                                    width= {size === 'xs' ? 328 : 539}
                                                    bodyStyle={{padding: size === 'xs' ? '0 16px' : '0px 85.5px',
                                                        height: calculateModalHeight(),
                                                        justifyContent: 'center'}}
                    ><Result title={'Отзыв успешно опубликован'}
                             status={'success'}
                             style={{padding: '0'}}

                    /> <Button type="primary"
                               style={{height: '40px', marginTop: '20px'}}
                               onClick={() => {
                                   setStatus('')
                               }}>Отлично</Button></Modal>}

                    {data.length ? <div className={styles.feedbacksBlock}>
                            {
                                data.slice(-20).map((feedback: FeedBackType) => {
                                    let fullName = ['Роман', 'Патейчук']
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
                            type={'primary'} onClick={createFeedback}>Написать отзыв</Button>
                    <Button type={'link'} data-test-id='all-reviews-button'
                            className={styles.switchShowFeedbacksBtn}
                            onClick={switchShowFeedbacks}>{buttonText}</Button>


                </div>}
        </>
    )
})
