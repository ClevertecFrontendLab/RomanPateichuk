import React, {useCallback, useEffect} from 'react'
import {Button, Form, Input} from "antd";
import {useChangePasswordMutation} from "@redux/api/authApi.ts";
import s from "@pages/login-page/login-page.module.scss";
import {Controller, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";


export const RecoveryPasswordForm: React.FC = ()=>{
    const [changePassword] = useChangePasswordMutation()
    const navigate = useNavigate()

    const prevLocation = useSelector(state => state.router.previousLocations[1]?.location.pathname)

    const handleFormSubmit = useCallback(async (values) => {
        console.log(values)
        localStorage.setItem('changePassword', JSON.stringify({
            password: values.password,
            confirmPassword: values.password
        }))
        await changePassword({
            password: values.password,
            confirmPassword: values.password
        })
            .unwrap()
            .then((response) => {
                console.log(response)
                return navigate('/result/success-change-password')
            }).catch(()=>{
                return navigate('/result/error-change-password')
            })
    }, [changePassword, navigate])

    const {control, getValues, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange"
    })

    useEffect(() => {
        if(prevLocation === '/result/error-change-password'){
            handleFormSubmit(JSON.parse(localStorage.getItem("changePassword")))
        }
    }, [handleFormSubmit, prevLocation]);



    return (

        <Form onSubmitCapture={handleSubmit(handleFormSubmit)} layout={'vertical'} name="signUp"
              className={s.signup}>

            <Form.Item validateStatus={errors.password && 'error'}
                       help={'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
            >
                <Controller name={'password'} rules={{
                    required: true,
                    pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                }}
                            control={control}
                            render={({field}) =>
                                <Input.Password  {...field} size={'large'}
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
                            render={({field}) => <Input.Password {...field} size={'large'}
                                                                 placeholder="Повторите пароль"/>}
                >


                </Controller>

            </Form.Item>
            <Button  size={'large'} type="primary"
                    htmlType="submit">
                Сохранить
            </Button>
        </Form>

    )
}
