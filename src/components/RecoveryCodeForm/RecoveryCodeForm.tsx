import React, {useState} from 'react'
import {Layout, Modal, Typography} from "antd";
import s from "./RecoveryCodeForm.module.scss";
import useMediaQuery from "use-media-antd-query";
import {useNavigate} from "react-router-dom";
import VerificationInput from "react-verification-input"
import {useLocation} from 'react-router-dom';
import {useConfirmEmailMutation} from "@redux/api/authApi.ts";
import {Loader} from "@components/Loader/Loader.tsx";
import className from "classnames"



const {Title, Text} = Typography;

export const RecoveryCodeForm: React.FC = ()=>{

    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('no error')


    const location = useLocation();
    const size = useMediaQuery();
    const navigate = useNavigate()
    const [confirmEmail, {isLoading}] = useConfirmEmailMutation()



    const onCompleteHandler = async (value: string)=>{
        await confirmEmail({
            "email": location.state,
            "code": value
        })
            .unwrap()
            .then((response) => {
                console.log(response)
                return navigate('/auth/change-password')
                //return navigate('/main')
            }).catch((error)=>{
                setError(error)
                setVerificationCode('');
            })
    }


    const handleVerificationChange = (value) => {
        // Обработка изменений в поле ввода
        setVerificationCode(value);
    };

    return (
        <Layout className={s.wrapper}>
            <Modal
                open={true}
                footer={null}
                closable={false}
                centered
                bodyStyle={{height: size === 'xs' ? '315px' : '363px'}}
                width={size === 'xs' ? 328 : 539}
            >
                {isLoading && <Loader data-test-id='loader'/>}
                {JSON.stringify(error)}
                <div className={s.middle}>
                    <Title className={s.title} level={3}>Введите код для восстановления аккауанта</Title>
                    <Text className={s.message}>Мы отправили вам на e-mail victorbyden@gmail.com шестизначный код. Введите его в поле ниже.</Text>

                    <div data-test-id='verification-input'>
                    <VerificationInput
                        classNames={{
                            container: {backgroundColor: "red"},
                            character: "character",
                            characterInactive: "character--inactive",
                            characterSelected: "character--selected",
                            characterFilled: "character--filled",
                        }}
                        onComplete={(value)=>{onCompleteHandler(value)}}
                        value={verificationCode}
                        onChange={handleVerificationChange}
                    />
                    </div>
                    <Text data-test-id='login-forgot-button' className={s.message}>Не пришло письмо? Проверьте папку Спам.</Text>
                </div>

            </Modal>
        </Layout>
    )
}

