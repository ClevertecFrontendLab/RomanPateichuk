import {Button, Result} from "antd";
import React, {useCallback} from "react";
import useMediaQuery from "use-media-antd-query";
import {useNavigate} from "react-router-dom";
import {Modal} from "@components/Modal";

export const ErrorStatusModal: React.FC = () => {
    const navigate = useNavigate()
    const size = useMediaQuery();

    const calculateModalHeight = useCallback(() => {
        return (size === 'xs') ? '568px' : '550px'
    }, [size])

    const calculateModalPadding = useCallback(() => {
        return (size === 'xs') ? '0 42px' : '0px 85.5px'
    }, [size])

    const onClickResultHandler = () => {
        return navigate('/main')
    }

    return <Modal
        height={calculateModalHeight()}
        padding={calculateModalPadding()}
        footer={null}
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
