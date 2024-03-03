import React, {useState} from 'react'
import {Button, Form, Modal, Rate} from "antd";
import {Input} from 'antd';
import {Controller, useForm, useWatch} from "react-hook-form";
import {useSendFeedBackMutation} from "@redux/api/feedBackApi.ts";


const {TextArea} = Input;

type CreateFeedBackFormPropsType = {
    isOpenCallBack: (value: boolean)=> void
    getStatus: (status: string)=>void
}

export const CreateFeedBackForm: React.FC<CreateFeedBackFormPropsType> = (props) => {
    const {isOpenCallBack,  getStatus} = props
    const [open, setOpen] = useState(true);
    const {control, handleSubmit, field, formState: {errors}} = useForm({
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
            footer={null}
            onCancel={handleCancel}
        >
            <Form onSubmitCapture={handleSubmit(handleFormSubmit)}>
                <Form.Item>
                    <Controller name={'rating'}
                                rules={{
                                    required: true,
                                }}
                                control={control}
                                render={({ field}) =>
                                    <Rate {...field}/>}/>
                </Form.Item>

                <Form.Item>
                    <Controller name={'message'}
                                control={control}
                                render={({ field}) => <TextArea

                                    rows={4} {...field} />}
                    />
                </Form.Item>


                <Form.Item>
                    <Button
                        type={'primary'}
                        htmlType="submit"
                        disabled={!watchedRatingField}
                    >Опубликовать</Button>
                </Form.Item>

            </Form>
        </Modal>
    )
}
