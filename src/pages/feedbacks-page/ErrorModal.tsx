import {Button, Modal, Result, Space} from "antd";
import React, {useCallback} from "react";
import useMediaQuery from "use-media-antd-query";
import {setStatus} from "@redux/appSlice.ts";
import {setShowFeedBacksModal} from "@redux/feedbacksSlice.ts";
import {useDispatch} from "react-redux";

export const ErrorModal: React.FC = () => {
    const dispatch = useDispatch()
    const size = useMediaQuery();

    const calculateModalHeight = useCallback(() => {
        return (size === 'xs') ? '281px' : '345px'
    }, [size])


    const errorHandler = () => {
        dispatch(setStatus('idle'))
        dispatch(setShowFeedBacksModal(true))
    }

    return <Modal open={true}
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
                    dispatch(setStatus('idle'))
                    dispatch(setShowFeedBacksModal(false))
                }}>Закрыть</Button>
        </Space>
    </Modal>
}

