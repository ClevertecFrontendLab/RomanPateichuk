import React, {useCallback, useEffect} from 'react'
import {Button, Form, Input, Layout, Modal, Spin, Typography} from "antd";
import {useChangePasswordMutation} from "@redux/api/authApi.ts";
import styles from "./Recovery.Password.module.scss";
import {Controller, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Loader} from "@components/Loader/Loader.tsx";
import useMediaQuery from "use-media-antd-query";
import {getStorageItem} from "@utils/index.ts";
const {Title} = Typography;

export const RecoveryPasswordForm: React.FC = () => {
    const [changePassword, {isLoading}] = useChangePasswordMutation()
    const navigate = useNavigate()

    const prevLocation = useSelector(state => state.router.previousLocations[1]?.location.pathname)

    const handleFormSubmit = useCallback(async (values) => {
        localStorage.setItem('changePassword', JSON.stringify({
            password: values.password,
            confirmPassword: values.password
        }))
        await changePassword({
            password: values.password,
            confirmPassword: values.password
        })
            .unwrap()
            .then(() => {
                return navigate('/result/success-change-password')
            }).catch(() => {
                return navigate('/result/error-change-password')
            })
    }, [changePassword, navigate])

    const {control, getValues, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange"
    })

    useEffect(() => {
        if (prevLocation === '/result/error-change-password') {
            handleFormSubmit(getStorageItem(localStorage, 'changePassword'))

        }
    }, [handleFormSubmit, prevLocation]);

    const size = useMediaQuery();

    return (
        <Layout className={styles.wrapper}>
            <Modal
                open={true}
                footer={null}
                closable={false}
                centered
                bodyStyle={{height: size === 'xs' ? '457px' : '428px'}}
                width={size === 'xs' ? 328 : 539}
            >
                <Title level={3} className={styles.title}>Восстановление аккауанта</Title>
                <Form onSubmitCapture={handleSubmit(handleFormSubmit)} layout={'vertical'}
                      name="signUp"
                      className={styles.signup}>
                    {isLoading && <Spin indicator={Loader} data-test-id="loader"/>}
                    <Form.Item validateStatus={errors.password && 'error'}
                               help={'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
                    >
                        <Controller name={'password'} rules={{
                            required: true,
                            pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                        }}
                                    control={control}
                                    render={({field}) =>
                                        <Input.Password
                                            data-test-id='change-password'
                                            {...field} size={'large'}
                                            placeholder="Пароль"></Input.Password>}/>

                    </Form.Item>

                    <Form.Item validateStatus={errors.password2 && 'error'}
                               help={errors.password2 && errors.password2?.message?.toString()}>
                        <Controller name={'password2'} rules={
                            {
                                required: true,
                                validate: (value: string) => {
                                    const {password} = getValues()
                                    return password === value || 'Пароли не совпадают'
                                },
                            }
                        }

                                    control={control}
                                    render={({field}) => <Input.Password
                                        data-test-id='change-confirm-password'

                                        {...field} size={'large'}
                                        placeholder="Повторите пароль"/>}
                        >


                        </Controller>

                    </Form.Item>
                    <Button
                        data-test-id='change-submit-button'
                        size={'large'} type="primary"
                        type="primary"
                        htmlType="submit">
                        Сохранить
                    </Button>
                </Form>
            </Modal>
        </Layout>

    )
}
