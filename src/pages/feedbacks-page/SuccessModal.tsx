import {Button, Result} from "antd";
import React, {useCallback} from "react";
import {setStatus} from "@redux/appSlice.ts";
import {useDispatch} from "react-redux";
import {Modal} from "@components/Modal";
import useMediaQuery from "use-media-antd-query";

export const SuccessModal: React.FC = () => {
    const dispatch = useDispatch()

    const size = useMediaQuery()

    const calculateModalPadding = useCallback(() => {
        return (size === 'xs') ? '1.5rem 1rem' : '0px 85.5px'
    }, [size])

    const calculateModalHeight = useCallback(() => {
        return (size === 'xs') ? '294px' : '327px'
    }, [size])

    return <Modal height={calculateModalHeight()} padding={calculateModalPadding()} footer={null}>
        <Result title={'Отзыв успешно опубликован'}
                status={'success'}
                style={{padding: '0'}}

        /> <Button type="primary"
                   style={{height: '40px', marginTop: '20px'}}
                   onClick={() => {
                       dispatch(setStatus('idle'))
                   }}>Отлично</Button></Modal>
}

