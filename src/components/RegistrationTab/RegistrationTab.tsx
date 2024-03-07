import React, {useCallback, useEffect} from "react";
import {useRegistrationMutation} from "@redux/api/authApi.ts";
import {useNavigate} from "react-router-dom";
import {EComponentStatus} from "@types/components.ts";
import {Controller, useForm} from "react-hook-form";
import {getStorageItem} from "@utils/index.ts";
import {Button, Form, Input} from "antd";
import styles from "./Registration.module.scss";
import {Loader} from "@components/Loader/Loader.tsx";
import {GooglePlusOutlined} from "@ant-design/icons";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";

export const RegistrationTab: React.FC = () => {
    const [registration, {isLoading}] = useRegistrationMutation();
    const prevLocation = useAppSelector(state => state.router.previousLocations[1]?.location.pathname)


    const navigate = useNavigate()


    const handleFormSubmit = useCallback(async (values) => {
        localStorage.setItem('registrationData', JSON.stringify({
            email: values.email,
            password: values.password
        }))
        await registration(
            {
                email: values.email,
                password: values.password
            })
            .unwrap()
            .then(() => {
                return navigate('/result/success')
            }).catch(e => {
                if (e.status === EComponentStatus.S409) {
                    return navigate('/result/error-user-exist')
                } else {
                    return navigate('/result/error')
                }
            })
    }, [navigate, registration])
    const {control, getValues, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange"
    })

    useEffect(() => {
        if (prevLocation === '/result/error') {
            handleFormSubmit(getStorageItem(localStorage, 'registrationData'))
        }
    }, [handleFormSubmit, prevLocation]);

    return (
        <Form onSubmitCapture={handleSubmit(handleFormSubmit)} layout={'vertical'} name="signUp"
              className={styles.signup}>
            {isLoading && <Loader/>}
            <Form.Item validateStatus={errors.email && 'error'}>
                <Controller name={'email'}
                            rules={{
                                required: true,
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            }}
                            control={control}
                            render={({field}) =>
                                <Input
                                    data-test-id='registration-email'
                                    size={'large'} {...field} className={styles.email}
                                    addonBefore="e-mail:"/>}/>

            </Form.Item>

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
                                    data-test-id='registration-password'
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
                                data-test-id='registration-confirm-password'
                                {...field} size={'large'}
                                placeholder="Повторите пароль"/>}
                >


                </Controller>

            </Form.Item>
            <Button
                data-test-id='registration-submit-button'
                size={'large'} type="primary"
                htmlType="submit">
                Войти
            </Button>
            <Button size={'large'} icon={<GooglePlusOutlined/>}>Регистрация через Google</Button>
        </Form>
    )
}
