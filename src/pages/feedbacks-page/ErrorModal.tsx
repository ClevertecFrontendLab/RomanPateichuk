import {Button, Result, Space} from "antd"
import React, {useCallback} from "react"
import {setStatus} from "@redux/appSlice.ts"
import {setShowFeedBacksModal} from "@redux/feedbacksSlice.ts"
import {useDispatch} from "react-redux"
import {Modal} from "@components/Modal"
import useMediaQuery from "use-media-antd-query"

export const ErrorModal: React.FC = () => {
    const dispatch = useDispatch()

    const errorHandler = () => {
        dispatch(setStatus('idle'))
        dispatch(setShowFeedBacksModal(true))
    }

    const size = useMediaQuery()

    const calculateModalHeight = useCallback(() => {
        return (size === 'xs') ? '281px' : '345px'
    }, [size])

    const calculateModalPadding = useCallback(() => {
        return (size === 'xs') ? '1.5rem 1rem' : '0px 85.5px'
    }, [size])

    return <Modal
        height={calculateModalHeight()}
        padding={calculateModalPadding()}
        footer={null}
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
                    dispatch(setStatus('idle'))
                    dispatch(setShowFeedBacksModal(false))
                }}>Закрыть</Button>
        </Space>
    </Modal>
}

