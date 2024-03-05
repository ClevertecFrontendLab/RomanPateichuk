import {Button, Modal, Result} from "antd";
import React, {useCallback} from "react";
import useMediaQuery from "use-media-antd-query";
import {useNavigate} from "react-router-dom";

export const ErrorStatusModal: React.FC = ()=> {
    const navigate = useNavigate()
    const size = useMediaQuery();
    const calculateModalHeight = useCallback(() => {
        return (size === 'xs') ? '568px' : '550px'
    }, [size])

    const onClickResultHandler = () => {
        return navigate('/main')
    }

    return <Modal open={true}
           footer={null}
           closable={false}
           centered
           maskStyle={{
               backgroundColor: 'rgba(121, 156, 213, 0.5)',
               backdropFilter: 'blur(5px)'
           }}
           bodyStyle={{
               height: calculateModalHeight(),
               padding: size === 'xs' ? '0 42px' : '0px 85.5px'
           }}
           width={size === 'xs' ? 328 : 539}
    >

        <Result title={'Что-то пошло не так'}
                style={{padding: '4rem 0'}}
                subTitle={'Произошла ошибка, попробуйте ещё раз.'}
                status={'500'}
                extra={<Button
                    style={{
                        width: '74px',
                        height: '40px',
                    }}
                    type="primary"
                    onClick={onClickResultHandler}>Назад</Button>}
        />
    </Modal>
}
