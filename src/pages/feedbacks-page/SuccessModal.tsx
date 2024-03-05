import {Button, Modal, Result} from "antd";
import React, {useCallback} from "react";
import useMediaQuery from "use-media-antd-query";

export const SuccessModal: React.FC = () => {
    const size = useMediaQuery();


    const calculateModalHeight = useCallback(() => {
        return (size === 'xs') ? '294px' : '327px'
    }, [size])

    return <Modal open={true}
                  footer={null}
                  closable={false}
                  centered
                  maskStyle={{
                      backgroundColor: 'rgba(121, 156, 213, 0.5)',
                      backdropFilter: 'blur(5px)'
                  }}
                  width= {size === 'xs' ? 328 : 539}
                  bodyStyle={{padding: size === 'xs' ? '0 16px' : '0px 85.5px',
                              height: calculateModalHeight(),
                              justifyContent: 'center'}}
    ><Result title={'Отзыв успешно опубликован'}
             status={'success'}
             style={{padding: '0'}}

    /> <Button type="primary"
               style={{height: '40px', marginTop: '20px'}}
               onClick={() => {
                   // setStatus('')
               }}>Отлично</Button></Modal>
}

