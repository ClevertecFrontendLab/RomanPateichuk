import React, {useState} from 'react'
import {Layout, Modal, Result, Spin, Typography} from "antd";
import styles from "./RecoveryCodeForm.module.scss";
import useMediaQuery from "use-media-antd-query";
import {useNavigate} from "react-router-dom";
import VerificationInput from "react-verification-input"
import {useConfirmEmailMutation} from "@redux/api/authApi.ts";
import {Loader} from "@components/Loader/Loader.tsx";
import {getStorageItem} from "@utils/index.ts";


const {Title, Text} = Typography;

export const RecoveryCodeForm: React.FC = ()=>{

    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState(false)
    const size = useMediaQuery();
    const navigate = useNavigate()
    const [confirmEmail, {isLoading}] = useConfirmEmailMutation()

    const email = getStorageItem(localStorage,"email")

    const onCompleteHandler = async (value: string)=>{
        await confirmEmail({
            "email": email,
            "code": value
        })
            .unwrap()
            .then(() => {
                return navigate('/auth/change-password')
            }).catch(()=>{
                setError(true)
                setVerificationCode('');
            })
    }


    const handleVerificationChange = (value) => {
        setVerificationCode(value);
    };

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
                {isLoading && <Spin indicator={Loader} data-test-id="loader"/>}
                <div className={styles.body}>
                <Result
                    title={<Title className={styles.title} level={3}>Введите код для восстановления аккауанта</Title>}
                    subTitle={`Мы отправили вам на e-mail ${email} шестизначный код. Введите его в поле ниже.`}
                    extra={
                    <div data-test-id='verification-input' >
                        <VerificationInput
                            classNames={{
                                container: styles.container,
                                character: styles.character + ' error',
                                character: `${styles.character} + ' '+ ${error && styles.error}`,
                                characterInactive: styles.inactive,
                                characterSelected: styles.selected,
                                characterFilled: styles.filled,
                            }}
                            onComplete={(value)=>{onCompleteHandler(value)}}
                            value={verificationCode}
                            onChange={handleVerificationChange}
                        />
                    </div>

                    }
                />
                <Text data-test-id='login-forgot-button' className={styles.message}>Не пришло письмо? Проверьте папку Спам.</Text>
                </div>
                </Modal>
        </Layout>
    )
}

