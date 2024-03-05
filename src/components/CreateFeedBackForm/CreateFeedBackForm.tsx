import React, {useState} from 'react'
import styles from './CreateFeedBackForm.module.scss'
import {Button, Form, Modal, Rate} from "antd";
import {Controller, useForm, useWatch} from "react-hook-form";
import {Input} from 'antd';
import {StarFilled, StarOutlined} from "@ant-design/icons";
import {setShowFeedBacksModal} from "@redux/feedbacksSlice.ts";
import {setStatus} from "@redux/appSlice.ts";
import {useDispatch} from "react-redux";
import {useSendFeedBackMutation} from "@redux/api/feedBackApi.ts";


const {TextArea} = Input;

export const CreateFeedBackForm: React.FC = () => {
    const [open, setOpen] = useState(true);
    const [sendFeedBack] = useSendFeedBackMutation()
    const dispatch = useDispatch()
    const {control, handleSubmit} = useForm({
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
                setOpen(false)
                dispatch(setShowFeedBacksModal(false))
                dispatch(setStatus('success'))
            }).catch(() => {
                dispatch(setStatus('error'))
            })
    }

    const handleCancel = () => {
        setOpen(false);
        dispatch(setShowFeedBacksModal(false))
    };

    return (
        <Modal
            title="Ваш отзыв"
            centered
            open={open}
            maskStyle={{ backgroundColor: 'rgba(121, 156, 213, 0.5)', backdropFilter: 'blur(5px)' }}
            footer={[
                <Button
                    data-test-id='new-review-submit-button'
                    type={'primary'}
                    htmlType="submit"
                    onClick={handleSubmit(handleFormSubmit)}
                    disabled={watchedRatingField === 0}
                >Опубликовать</Button>
            ]}
            onCancel={handleCancel}
            className={styles.modal}
        >
            <Form className={styles.form} onSubmitCapture={handleSubmit(handleFormSubmit)}>
                <Form.Item className={styles.rateFormItem}>
                    <Controller name={'rating'}
                                control={control}
                                render={({ field}) =>
                                    <Rate className={styles.rate}  {...field} count={5} character={({ index, value }) => {
                                        if (index + 1 <= value) {
                                            return <StarFilled className={styles.starIcon}/>;
                                        } else {
                                            return <StarOutlined className={styles.starIcon} />;
                                        }
                                    }}
                                    />}/>
                </Form.Item>

                <Form.Item className={styles.message}>
                    <Controller name={'message'}
                                control={control}
                                render={({ field}) => <TextArea
                                    onChange={(value)=>{
                                        console.log(value)
                                    }
                                }
                                    placeholder={'Autosize height based on content lines'}
                                    autoSize={{ minRows: 2}} {...field} />}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

