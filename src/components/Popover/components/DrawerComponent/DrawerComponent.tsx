import React, {ChangeEvent, useCallback, useState} from "react";
import {Button, Drawer, Form, Input, InputNumber, Space, Typography} from "antd";
import {isOpenDrawerSelector, selectedTrainingSelector} from "@redux/selectors.ts";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {AppDispatch} from "@redux/configure-store.ts";
import {setCreatedExercisesList, setIsOpenDrawer} from "@redux/calendarSlice.ts";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import {v1} from "uuid";

const {Title, Text} = Typography;

export const DrawerComponent: React.FC = React.memo(() => {
    const dispatch: AppDispatch = useAppDispatch()
    const selectedTraining = useAppSelector(selectedTrainingSelector)
    const isOpenDrawer = useAppSelector(isOpenDrawerSelector)



    const [forms, setForms] = useState([
        {
            _id: v1(),
            name: '',
            replays: null,
            weight: null,
            approaches: null,
            isImplementation: false
        }

    ])


    const handleAddForm = () => {
        const newForm = {
            _id: v1(),
            name: '',
            replays: null,
            weight: null,
            approaches: null,
            isImplementation: false
        }
        setForms([...forms, newForm])
    };

    const onClose = () => {
        dispatch(setIsOpenDrawer(false))

        const filterList = forms.filter(obj => obj.name.trim() !== '')

        filterList.length === 0 ? setForms([{
            _id: v1(),
            name: '',
            replays: null,
            weight: null,
            approaches: null,
            isImplementation: false
        }]) : setForms(filterList)

        dispatch(setCreatedExercisesList(filterList.map(({ _id, ...rest }) => rest)))

    }

    const onchangeExerciseHandler = (e: ChangeEvent<HTMLInputElement>, _id: sting)=>{
        const value = e.currentTarget.value
        const data = forms.map(item => item._id === _id ? {...item, name: value} : item)
        setForms(data)
    }


    const onchangeApproachesHandler = (value: number, _id: sting)=>{
        const data = forms.map(item => item._id === _id ? {...item, approaches: value} : item)
        setForms(data)
    }

    const onchangeWeightHandler = (value: number, _id: sting)=>{
        const data = forms.map(item => item._id === _id ? {...item, weight: value} : item)
        setForms(data)
    }

    const onchangeReplaysHandler = (value: number, _id: sting)=>{
        const data = forms.map(item => item._id === _id ? {...item, replays: value} : item)
        setForms(data)
    }


    return <Drawer title={<Space align="center">
        <PlusOutlined/>
        <Title level={4}>Добавление упражнений</Title>
        <Button onClick={onClose} icon={<CloseOutlined/>}></Button>
    </Space>}
                   onClose={onClose}
                   closeIcon={null}
                   zIndex={1000000}
                   open={isOpenDrawer}>

        <Space>
            <Text>{selectedTraining}</Text>
        </Space>

        <Form>
            {forms.map(item => <div key={v1()}>
                <Form.Item>
                    <Input autoFocus onChange={(e: ChangeEvent<HTMLInputElement>)=>onchangeExerciseHandler(e, item._id)} value={item.name} placeholder="Упражнение"/>
                </Form.Item>

                <Form.Item label="Подходы">
                    <InputNumber
                        min={1}
                        onChange={(value: number)=>onchangeApproachesHandler(value,item._id)} defaultValue={item.approaches} addonBefore="+" placeholder={'1'} />
                </Form.Item>

                <Form.Item label="Вес, кг">
                    <InputNumber min={0} onChange={(value: number)=>onchangeWeightHandler(value,item._id)} defaultValue={item.weight} placeholder={'0'}/>
                </Form.Item>
                <span>x</span>
                <Form.Item label="Количество">
                    <InputNumber  min={1} onChange={(value: number)=>onchangeReplaysHandler(value,item._id)} defaultValue={item.replays} placeholder={'3'}/>
                </Form.Item>
            </div>)
            }

            <Form.Item>
                <Button type="primary" onClick={handleAddForm}>Добавить еще</Button>
            </Form.Item>

        </Form>


    </Drawer>
})
