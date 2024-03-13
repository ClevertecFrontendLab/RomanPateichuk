import React, {ReactNode, useState} from 'react'
import {Modal} from 'antd';
import useMediaQuery from "use-media-antd-query";
import {setShowFeedBacksModal} from "@redux/feedbacksSlice.ts";
import {useDispatch} from "react-redux";

interface CustomModalProp {
    children: ReactNode,
    padding?: string,
    height?: string,
    footer?: Array<ReactNode> | null,
    title?: string,
    className?: string,
}

export const CustomModal: React.FC<CustomModalProp> = (props) => {
    const {children,className, padding='auto' , height= 'auto', footer, title} = props
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch()
    const size = useMediaQuery();

    const callHandleCancel = () => {
        setOpen(false)
        dispatch(setShowFeedBacksModal(false))
    }


    return (
        <Modal open={open}
               title={title}
               footer={footer}
               closable={!!footer}
               onCancel={callHandleCancel}
               centered
               className={className}
               maskStyle={{
                   backgroundColor: 'rgba(121, 156, 213, 0.5)',
                   backdropFilter: 'blur(5px)'
               }}
               width={size === 'xs' ? 328 : 539}
               bodyStyle={{
                   padding: padding,
                   height: height,
                   justifyContent: 'center'
               }}>
            {children}
        </Modal>
    )
}
