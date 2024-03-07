import React, { useState} from 'react'
import classNames from 'classnames/bind';
import styles from './feedbacks-page.module.scss'
import {Button, Space} from "antd";
import {CreateFeedBackForm} from "@components/CreateFeedBackForm/CreateFeedBackForm.tsx";
import {EComponentStatus} from '@types/components.ts'
import {ErrorModal} from "@pages/feedbacks-page/ErrorModal.tsx";
import {SuccessModal} from "@pages/feedbacks-page/SuccessModal.tsx";
import {Typography} from 'antd';
import {setShowFeedBacksModal} from "@redux/feedbacksSlice.ts";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {useDispatch} from "react-redux";
import {useGetFeedBackQuery} from "@redux/api/feedBackApi.ts";
import {useNavigate} from "react-router-dom";
import {ErrorStatusModal} from "@components/ErrorStatusModal/ErrorStatusModal.tsx";
import {Loader} from "@components/Loader/Loader.tsx";
//import { Virtuoso } from 'react-virtuoso'

import {
    FeedBackComponent,
    FeedBackSchema
} from "@components/FeedBackComponent/FeedBackComponent.tsx";
const {Text, Title} = Typography;


export const FeedbacksPage: React.FC = React.memo(() => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {data = [], isLoading,  isError, error} = useGetFeedBackQuery('')
    const reversedData =[...data].reverse()
    const cx = classNames.bind(styles);
    const showFeedBackForm = useAppSelector(state=> state.feedbacks.isShowModal)
    const status = useAppSelector(state=> state.app.status)
    const [isExpanded, setIsExpanded] = useState<boolean>()
    const FeedbacksPageClassName = cx({
        wrapper: true,
        open: isExpanded,
        hideButtons: !reversedData.length
    })

    const toogleFeedbacks = ()=> setIsExpanded(!isExpanded)

    if (isError) {
        if (error.status === EComponentStatus.S403) {
            sessionStorage.removeItem("token");
            localStorage.removeItem("token");
            return navigate('/auth')

        } else {
            return <ErrorStatusModal/>
        }
    }

    const buttonText = isExpanded ? 'Свернуть все отзывы' : 'Развернуть все отзывы'


    const displayCount = isExpanded ? reversedData.length : 4;
    return (
        <>
            {isLoading ?
                <Loader/> :
                <div className={FeedbacksPageClassName}>
                    {showFeedBackForm &&
                        <CreateFeedBackForm />}
                    {status === 'error' && <ErrorModal/>}
                    {status === 'success' && <SuccessModal/>}

                    {reversedData.length ?
                        (
                                // todo fix error ResizeObserver loop completed with undelivered notifications
                                // <Virtuoso
                                //     style={{height: '572px'}}
                                //     className={styles.feedbacksBlock}
                                //     data = { reversedData.slice(0, displayCount)}
                                //     itemContent={(index, feedback: FeedBackSchema) => <FeedBackComponent key={index} feedback={feedback}/>}
                                // />
                            reversedData.slice(0, displayCount).map((feedback: FeedBackSchema) => <FeedBackComponent key={feedback.id} feedback={feedback}/>)



                        )
                        : (
                            <div className={styles.noFeedbacksBlock}>
                            <div className={styles.content}>
                                <Title className={styles.title}>Оставьте свой отзыв первым</Title>
                                <Text className={styles.text}>Вы можете быть первым, кто оставит
                                    отзыв об этом фитнесс приложении. Поделитесь своим мнением и
                                    опытом с другими пользователями, и помогите им сделать
                                    правильный выбор.</Text>
                            </div>
                        </div>
                        )
                    }

                    <Space className={styles.btnsWrapper}>
                    <Button data-test-id='write-review' className={styles.createFeedbackBtn}
                            type={'primary'} onClick={()=>{dispatch(setShowFeedBacksModal(true))}}>Написать отзыв</Button>
                     <Button type={'link'} data-test-id='all-reviews-button'
                            className={styles.switchShowFeedbacksBtn}
                            onClick={toogleFeedbacks}>{buttonText}</Button>
                    </Space>



                </div>
            }
        </>
    )
})
