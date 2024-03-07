import React, {useCallback, useEffect} from "react";
import {
    useCheckEmailMutation,
    useLoginMutation,
} from "@redux/api/authApi.ts";
import {Loader} from "@components/Loader/Loader.tsx";
import styles from "./LoginTab.module.scss";
import {Button, Checkbox, Form, Input, Space} from "antd";
import {Controller, useForm} from "react-hook-form";
import {EComponentStatus} from "@types/components.ts";
import {GooglePlusOutlined} from "@ant-design/icons";
import {getStorageItem} from "@utils/index.ts";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {useNavigate} from "react-router-dom";


export const LoginTab: React.FC = () => {
    const [login, {isLoading: isLoadingLogin}] = useLoginMutation();
    const [checkEmail, {isLoading: isLoadingCheckEmail}] = useCheckEmailMutation()


    const prevLocation = useAppSelector(state => state.router.previousLocations[1]?.location.pathname)
    const navigate = useNavigate()

    const handleForgetPassword = useCallback(async (email: string, setError: () => void) => {
        if (!email) {
            setError('email', {type: 'pattern', message: ''});
            return;
        }
        localStorage.setItem('email', JSON.stringify(email))

        await checkEmail({
            "email": email
        })
            .unwrap()
            .then(() => {
                return navigate('/auth/confirm-email', {state: email})
            }).catch((e) => {
                if (e.status === EComponentStatus.S404) {
                    return navigate('/result/error-check-email-no-exist')
                } else {
                    return navigate('/result/error-check-email')
                }


            })

    }, [checkEmail, navigate])


    useEffect( () => {
        if (prevLocation === '/result/error-check-email') {
             handleForgetPassword(getStorageItem(localStorage, "email"))
        }
    }, [handleForgetPassword, prevLocation]);


    const handleFormSubmit = async (values: {email: string, password: string, rememberMe: boolean}) => {
        await login(values)
            .unwrap()
            .then((response) => {
                if (values.rememberMe) {
                    localStorage.setItem('token', JSON.stringify(response['accessToken']))
                } else {
                    sessionStorage.setItem('token', JSON.stringify(response['accessToken']))
                }
                return navigate('/main')
            }).catch(() => {
                return navigate('/result/error-login')
            })
    }

    const authGoogleHandler = async () => {
        window.location.href = 'https://marathon-api.clevertec.ru/auth/google'
    }

    const {control, setError, getValues, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange"
    })

    return (
        <div>

            <Form onSubmitCapture={handleSubmit(handleFormSubmit)} layout={'vertical'} name="login"
                  className={styles.login}>
                {(isLoadingLogin || isLoadingCheckEmail) && <Loader/>}

                <Form.Item validateStatus={errors.email && 'error'}>
                    <Controller name={'email'}
                                rules={{
                                    required: true,
                                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                }}
                                control={control}
                                render={({field}) =>
                                    <Input size={'large'} {...field} className={styles.email}
                                           data-test-id='login-email'
                                           addonBefore="e-mail:"/>}/>

                </Form.Item>
                <Form.Item validateStatus={errors.password && 'error'}>
                    <Controller name={'password'} rules={{
                        required: true,
                        pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                    }}
                                control={control}
                                render={({field}) =>
                                    <Input.Password {...field} size={'large'}
                                                    data-test-id='login-password'
                                                    placeholder="Пароль"></Input.Password>}/>

                </Form.Item>
                <Space direction={'horizontal'}>

                    <Controller name={'rememberMe'} control={control}
                                render={({field}) =>
                                    <Checkbox
                                        data-test-id='login-remember'
                                        {...field}>Запомнить меня</Checkbox>}
                    />


                    <Controller name={'forgetPassword'} control={control}
                                render={() => <Button
                                    data-test-id='login-forgot-button'
                                    disabled={!!errors.email}
                                    onClick={async () => {
                                        await handleForgetPassword(getValues('email'), setError)
                                    }} type="link">Забыли
                                    пароль?</Button>}
                    />


                </Space>
                <Button
                    data-test-id='login-submit-button'
                    size={'large'} type="primary" htmlType="submit">
                    Войти
                </Button>

                <Button size={'large'}
                        onClick={authGoogleHandler}
                        icon={<GooglePlusOutlined/>}>Войти через
                    Google</Button>
            </Form>

        </div>
    )
}
