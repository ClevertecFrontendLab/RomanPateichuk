import React, {useCallback} from 'react'
import styles from './CreateFeedBackForm.module.scss'
import {Button, Form} from "antd";
import {Controller, useForm, useWatch} from "react-hook-form";
import {Input} from 'antd';
import {setShowFeedBacksModal} from "@redux/feedbacksSlice.ts";
import {setStatus} from "@redux/appSlice.ts";
import {useDispatch} from "react-redux";
import {useSendFeedBackMutation} from "@redux/api/feedBackApi.ts";
import {CustomRate} from "@components/Rate";
import {Modal} from "@components/Modal";
import {Loader} from "@components/Loader/Loader.tsx";
import useMediaQuery from "use-media-antd-query";

const {TextArea} = Input;

interface IFormType {
    message: string,
    rating: string
}

export const CreateFeedBackForm: React.FC = () => {
    const [sendFeedBack, {isLoading}] = useSendFeedBackMutation()
    const dispatch = useDispatch()
    const {control, handleSubmit} = useForm<IFormType>({
        mode: "onChange"
    })

    const watchedRatingField = useWatch({
        control,
        name: 'rating',
    });

    const handleFormSubmit = async (values: { message: string, rating: string }) => {

        await sendFeedBack({
            "message": values.message,
            "rating": values.rating
        })
            .unwrap()
            .then(() => {
                dispatch(setStatus('success'))
                dispatch(setShowFeedBacksModal(false))
            }).catch(() => {
                dispatch(setStatus('error'))
            })
    }

    const size = useMediaQuery()

    const calculateModalPadding = useCallback(() => {
        return (size === 'xs') ? '1.5rem 1rem' : '1.5rem'
    }, [size])

    return (
        <Modal
            title="Ваш отзыв"
            footer={[
                <Button
                    data-test-id='new-review-submit-button'
                    type={'primary'}
                    htmlType="submit"
                    onClick={handleSubmit(handleFormSubmit)}
                    disabled={Number(watchedRatingField) === 0}
                >Опубликовать</Button>
            ]}
            className={styles.modal}
            padding={calculateModalPadding()}
        >
            {isLoading && <Loader/>}
            <Form className={styles.form} onSubmitCapture={handleSubmit(handleFormSubmit)}>
                <Form.Item className={styles.rateFormItem}>
                    <Controller name={'rating'}
                                control={control}
                                render={({field}) =>
                                    <CustomRate
                                        {...field}
                                        size={'1.5rem'}

                                    />}/>
                </Form.Item>

                <Form.Item className={styles.message}>
                    <Controller name={'message'}
                                control={control}
                                render={({field}) => <TextArea
                                    placeholder={'Autosize height based on content lines'}
                                    autoSize={{minRows: 2}} {...field} />}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

