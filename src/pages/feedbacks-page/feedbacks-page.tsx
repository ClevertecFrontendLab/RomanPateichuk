import React, {useEffect, useState} from 'react'
import styles from './feedbacks-page.module.scss'
import {useGetFeedBackQuery} from "@redux/api/feedBackApi.ts";
import {Avatar, Button, Modal, Rate, Result, Spin} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {EComponentStatus} from "@types/components.ts";
import {useNavigate} from "react-router-dom";
import Loader from "../../assets/loader.json";
import {CreateFeedBackForm} from "@components/CreateFeedBackForm/CreateFeedBackForm.tsx";


export interface FeedBackType {
    id: string
    fullName: null | string
    imageSrc: null | string
    message: string
    rating: number
    createdAt: string
}

export const FeedbacksPage: React.FC = React.memo(() => {
    const [feedback, setFeedback] = useState<Array<FeedBackType>>([])
    const [showFeedBackForm, setShowFeedBackForm] = useState(false)
    const [buttonText, setButtonText] = useState('Развернуть все отзывы')
    const {data = [], isLoading, isFetching, isError, error} = useGetFeedBackQuery('')
    const [status, setStatus] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        setFeedback(data.slice(-4))
    }, [isLoading, data]);

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
        setFeedback(feedback === data ? data.slice(-4) : data)
        setButtonText(buttonText === 'Развернуть все отзывы' ? 'Свернуть все отзывы' : 'Развернуть все отзывы')
    }

    const errorHandler = ()=>{
        setStatus('')
        createFeedback()
    }

    return (
        <div className={styles.wrapper}>
            {isLoading && <Spin indicator={Loader} data-test-id="loader"/>}
            {showFeedBackForm &&
                <CreateFeedBackForm isOpenCallBack={isOpenCallBack} getStatus={getStatus}/>}
            {status === 'error' &&
                <Modal open={true}
                footer={null}
                closable={false}
                centered>
                    <Result
                        title={'Данные не сохранились'}
                        status={'error'}
                        extra={
                        <div>
                        <Button type="primary" onClick={errorHandler}>Написать отзыв</Button>
                        <Button onClick={()=>{setStatus(''); setShowFeedBackForm(false)}}>Закрыть</Button>
                        </div>
                    }
                    />
                </Modal>}

            {status === 'success' &&
                <Modal open={true}
                       footer={null}
                       closable={false}
                       centered
                ><Result title={'Отзыв успешно опубликован'}
                         status={'success'}
                         testId={''}
                         extra={<Button type="primary"
                                        onClick={()=>{setStatus('')}}>Отлично</Button>}
                /></Modal>
            }

            {data.length ? <div>
                    {
                        feedback.map(feedback => (
                            <div key={feedback.id}>
                                <Avatar alt={'avatar'}
                                        icon={feedback.imageSrc ? feedback.imageSrc : <UserOutlined/>}/>
                                <div>{feedback.fullName}</div>
                                <p>{String(feedback.createdAt.match(/\d{4}-\d{2}-\d{2}/)).split('-').reverse().join('.')}</p>
                                <Rate disabled value={feedback.rating}/>
                                <p>{feedback.message}</p>
                            </div>
                        )).reverse()
                    }
                    <Button onClick={createFeedback}>Написать отзыв</Button>
                    <Button onClick={switchShowFeedbacks}>{buttonText}</Button>

                </div>
                : <div>Оставьте отзыв первым<Button onClick={createFeedback}>Написать отзыв</Button>
                </div>}


        </div>
    )
})
