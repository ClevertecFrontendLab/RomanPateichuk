import React, {useState} from 'react'
import {Button, Form, Modal, Rate} from "antd";
import {Input} from 'antd';
import {Controller, useForm, useWatch} from "react-hook-form";
import {useSendFeedBackMutation} from "@redux/api/feedBackApi.ts";
import styles from './CreateFeedBackForm.module.scss'
import {StarFilled, StarOutlined} from "@ant-design/icons";


const {TextArea} = Input;

type CreateFeedBackFormPropsType = {
    isOpenCallBack: (value: boolean)=> void
    getStatus: (status: string)=>void
}

export const CreateFeedBackForm: React.FC<CreateFeedBackFormPropsType> = (props) => {
    const {isOpenCallBack,  getStatus} = props
    const [open, setOpen] = useState(true);
    const {control, handleSubmit} = useForm({
        mode: "onChange"
    })

    const watchedRatingField = useWatch({
        control,
        name: 'rating',
    });


    const [sendFeedBack] = useSendFeedBackMutation()

    const handleFormSubmit = async (values: { message: string, rating: string }) => {

        await sendFeedBack({
            "message": values.message,
            "rating": values.rating
        })
            .unwrap()
            .then(() => {
                setOpen(false)
                isOpenCallBack(false)
                getStatus('success')
            }).catch(() => {
                getStatus('error')
            })
    }



    const handleCancel = () => {
        setOpen(false);
        isOpenCallBack(false)
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
                                    placeholder={'Autosize height based on content lines'}
                                    autoSize={{ minRows: 2}} {...field} />}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}
