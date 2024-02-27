import React, {useCallback, useEffect, useState} from 'react'
import {useForm, Controller} from "react-hook-form"
import {
    useLoginMutation,
    useRegistrationMutation,
    useCheckEmailMutation
} from "@redux/api/authApi"

import {
    Button,
    Checkbox,
    Form,
    Input,
    Layout,
    Modal,
    Space,
    Tabs,
    TabsProps,
} from "antd";
import {
    GooglePlusOutlined,
} from '@ant-design/icons';

import {LogoFormIcon} from "@components/Icon/library.tsx";
import useMediaQuery from 'use-media-antd-query';
import s from './login-page.module.scss'
import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";


export const Login: React.FC = () => {
    const [login, {isLoading}] = useLoginMutation();
    const [checkEmail] = useCheckEmailMutation()

    const prevLocation = useSelector(state => state.router.previousLocations[1]?.location.pathname)
    const navigate = useNavigate()

    const handleForgetPassword = useCallback(async (email: string)=> {
        localStorage.setItem('email', JSON.stringify(email))
        await checkEmail({
            "email": email
        })
            .unwrap()
            .then((response) => {
                console.log(response)
                return navigate('/auth/confirm-email', {state: email})
                //return navigate('/main')
            }).catch((error)=>{
                console.log(error)
                if(error.data.statusCode === 404){
                    return navigate('/result/error-check-email-no-exist')
                }
                else{
                    return navigate('/result/error-check-email')
                }


            })

    }, [checkEmail, navigate])


    useEffect(() => {
        if(prevLocation === '/result/error-check-email'){
            handleForgetPassword(JSON.parse(localStorage.getItem("email")))
        }
    }, [handleForgetPassword, prevLocation]);





    const handleFormSubmit = async (values) => {
        await login(values)
              .unwrap()
              .then((response) => {
                  if(values.rememberMe){
                      localStorage.setItem('token', JSON.stringify(response['accessToken']))
                  }
                  else{
                      sessionStorage.setItem('token', JSON.stringify(response['accessToken']))
                  }
                  return navigate('/main')
             }).catch(()=>{
                return navigate('/result/error-login')
            })
    }

    const {control,getValues, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange"
    })

    return (
        <div>
            {isLoading && <div>Loading...</div>}
        <Form onSubmitCapture={handleSubmit(handleFormSubmit)} layout={'vertical'} name="login"
              className={s.login}>
            <Form.Item validateStatus={errors.email && 'error'}>
                <Controller name={'email'}
                            rules={{
                                required: true,
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            }}
                            control={control}
                            render={({field}) =>
                                <Input size={'large'} {...field} className={s.email}
                                       addonBefore="e-mail:"/>}/>

            </Form.Item>

            <Form.Item validateStatus={errors.password && 'error'}>
                <Controller name={'password'} rules={{required: true}} control={control}
                            render={({field}) =>
                                <Input.Password {...field} size={'large'}
                                                placeholder="Пароль"></Input.Password>}/>

            </Form.Item>

            <Space direction={'horizontal'}>

                <Controller name={'rememberMe'}  control={control}
                            render={({ field})=>
                                <Checkbox {...field}>Запомнить меня</Checkbox>}
                />


                    <Controller name={'forgetPassword'} control={control}
                                render={()=><Button disabled={errors.email} onClick={()=>{handleForgetPassword(getValues('email'))}}  type="link">Забыли пароль?</Button>}
                    />



            </Space>
            <Button size={'large'} type="primary" htmlType="submit">
                Войти
            </Button>


            <Button size={'large'} icon={<GooglePlusOutlined/>}>Войти через Google</Button>
        </Form>
        </div>
    )
}

export const SignUp: React.FC = () => {
    const [registration] = useRegistrationMutation();
    const prevLocation = useSelector(state => state.router.previousLocations[1].location.pathname)


    const navigate = useNavigate()


    const handleFormSubmit = useCallback(async (values) => {
        localStorage.setItem('registrationData', JSON.stringify({email: values.email, password: values.password}))
        await registration(values)
            .unwrap()
            .then(() => {
                return navigate('/result/success')
            }).catch(e=>{
                if(e.data.statusCode === 409){
                    return navigate('/result/error-user-exist')

                }
                else{
                    return navigate('/result/error')
                }
            })
    }, [navigate, registration])
    const {control, getValues, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange"
    })

    useEffect(() => {
        if(prevLocation === '/result/error'){
            handleFormSubmit(JSON.parse(localStorage.getItem("registrationData")))
        }
    }, [handleFormSubmit, prevLocation]);





    return (
        <Form onSubmitCapture={handleSubmit(handleFormSubmit)} layout={'vertical'} name="signUp"
              className={s.signup}>
            <Form.Item validateStatus={errors.email && 'error'}>
                <Controller name={'email'}
                            rules={{
                                required: true,
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            }}
                            control={control}
                            render={({field}) =>
                                <Input size={'large'} {...field} className={s.email}
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
            <Button disabled={Object.keys(errors).length > 0} size={'large'} type="primary"
                    htmlType="submit">
                Войти
            </Button>
            <Button size={'large'} icon={<GooglePlusOutlined/>}>Регистрация через Google</Button>
        </Form>
    )
}


export const LoginPage: React.FC = () => {
    const size = useMediaQuery();
    const location = useLocation();
    const [tab, setTab] = useState<string>(location.pathname)

    const tabItems: TabsProps['items'] = [
        {
            key: '/auth',
            label: <NavLink to={'/auth'}>Вход</NavLink>,
        },
        {
            key: '/auth/registration',
            label: <NavLink to={'registration'}>Регистрация</NavLink>,
        },
    ]


    return (
        <Layout className={s.wrapper}>
            <Modal
                open={true}
                footer={null}
                closable={false}
                centered
                bodyStyle={{
                    height: (tab === '/auth') ? (size === 'xs') ? '612px' : '742px' : (size === 'xs') ? '564px' : '686px'

                }}
                width={size === 'xs' ? 328 : 539}
            >
                <div className={s.content}>
                    <LogoFormIcon className={s.logo}/>
                    <Tabs
                        defaultActiveKey={tab}
                        items={tabItems}
                        tabBarStyle={{
                            width: '100%',
                            margin: (tab === '/auth')
                                ? (size === 'xs') ? '0 0 1.5rem 0' : '0 0 1.5rem 0' : (size === 'xs') ? '0 0 1.5rem 0' : '0 0 1.875rem 0'
                        }}
                        onChange={(activeKey: string) => {
                            setTab(activeKey)
                        }}

                    />
                    <Outlet/>
                </div>
            </Modal>
            {/*<Message*/}
            {/*    isOpen={false}*/}
            {/*    icon={<ErrorIcon/>}*/}
            {/*    message={'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'}*/}
            {/*    title={'Данные не сохранились'}*/}
            {/*    actionText={'Назад к регистрации'}*/}
            {/*    action={() => {*/}
            {/*        alert('Назад к регистрации')*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<Message*/}
            {/*    isOpen={false}*/}
            {/*    icon={<WarningIcon/>}*/}
            {/*    message={'Что-то пошло не так. Попробуйте еще раз'}*/}
            {/*    title={'Вход не выполнен'}*/}
            {/*    actionText={'Повторить'}*/}
            {/*    action={() => {*/}
            {/*        alert('Повторить')*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<Message*/}
            {/*    isOpen={false}*/}
            {/*    icon={<SuccessIcon/>}*/}
            {/*    message={'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'}*/}
            {/*    title={'Регистрация успешна'}*/}
            {/*    actionText={'Войти'}*/}
            {/*    action={() => {*/}
            {/*        alert('Войти')*/}
            {/*    }}*/}
            {/*/>*/}
        </Layout>
    )
}
