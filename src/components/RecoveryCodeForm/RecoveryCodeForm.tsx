import React, {useState} from 'react'
import {Layout, Modal, Result, Spin, Typography} from "antd";
import s from "./RecoveryCodeForm.module.scss";
import useMediaQuery from "use-media-antd-query";
import {useNavigate} from "react-router-dom";
import VerificationInput from "react-verification-input"
import {useLocation} from 'react-router-dom';
import {useConfirmEmailMutation} from "@redux/api/authApi.ts";
import {Loader} from "@components/Loader/Loader.tsx";
import {getStorageItem} from "@utils/index.ts";


const {Title, Text} = Typography;

export const RecoveryCodeForm: React.FC = ()=>{



    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState(false)


    const location = useLocation();
    const size = useMediaQuery();
    const navigate = useNavigate()
    const [confirmEmail, {isLoading}] = useConfirmEmailMutation()

    const email = getStorageItem(localStorage,"email")
   // const email = JSON.parse(localStorage.getItem('email'))

//location.state
    const onCompleteHandler = async (value: string)=>{
        await confirmEmail({
            "email": email,
            "code": value
        })
            .unwrap()
            .then((response) => {
                return navigate('/auth/change-password')
            }).catch((error)=>{
                setError(true)
                setVerificationCode('');
            })
    }


    const handleVerificationChange = (value) => {
        setVerificationCode(value);
    };

    return (
        <Layout className={s.wrapper}>
            <Modal
                open={true}
                footer={null}
                closable={false}
                centered
                bodyStyle={{height: size === 'xs' ? '457px' : '428px'}}
                width={size === 'xs' ? 328 : 539}
            >
                {isLoading && <Spin indicator={Loader} data-test-id="loader"/>}
                <div className={s.body}>
                <Result
                    title={<Title className={s.title} level={3}>Введите код для восстановления аккауанта</Title>}
                    subTitle={`Мы отправили вам на e-mail ${email} шестизначный код. Введите его в поле ниже.`}
                    extra={
                    <div data-test-id='verification-input' >
                        <VerificationInput
                            classNames={{
                                container: s.container,
                                character: s.character + ' error',
                                character: `${s.character} + ' '+ ${error && s.error}`,
                                characterInactive: s.inactive,
                                characterSelected: s.selected,
                                characterFilled: s.filled,
                            }}
                            onComplete={(value)=>{onCompleteHandler(value)}}
                            value={verificationCode}
                            onChange={handleVerificationChange}
                        />
                    </div>

                    }
                />
                <Text data-test-id='login-forgot-button' className={s.message}>Не пришло письмо? Проверьте папку Спам.</Text>
                </div>
                </Modal>
        </Layout>
    )
}

