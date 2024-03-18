import React, {ChangeEvent, useState} from "react";
import {Button, Drawer, Form, Input, InputNumber, Space, Typography} from "antd";
import {isOpenDrawerSelector, selectedTrainingSelector} from "@redux/selectors.ts";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {AppDispatch} from "@redux/configure-store.ts";
import {setIsOpenDrawer} from "@redux/calendarSlice.ts";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import {v1} from "uuid";

const {Title, Text} = Typography;

export const DrawerComponent: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const selectedTraining = useAppSelector(selectedTrainingSelector)
    const isOpenDrawer = useAppSelector(isOpenDrawerSelector)



    const [forms, setForms] = useState([
        {
            id: v1(),
            exercise: '',
            approaches: '',
            weight: '',
            count: '',
        }

    ])

    console.log(forms)

    const handleAddForm = () => {
        const newForm = {
            id: v1(),
            exercise: '',
            approaches: '',
            weight: '',
            count: '',
        }
        setForms([...forms, newForm])
    };

    const onClose = () => {
        dispatch(setIsOpenDrawer(false))

        const sliceArray = forms.slice(1)

        const filterList = sliceArray.filter(obj=> {
            for (const key in obj) {
                if (obj[key] === "") {
                    return false;
                }
            }
            return true;
        })
        setForms([forms[0], ...filterList])
    }

    const onchangeExerciseHandler = (e: ChangeEvent<HTMLInputElement>, id: sting)=>{
        const value = e.currentTarget.value
        const data = forms.map(item => item.id === id ? {...item, exercise: value} : item)
        setForms(data)
    }


    const onchangeApproachesHandler = (e)=>{
        const value = e.currentTarget.value
        const data = forms.map(item => item.id === id ? {...item, approaches: value} : item)
        setForms(data)
    }

    const onchangeWeightHandler = ()=>{
        const value = e.currentTarget.value
        const data = forms.map(item => item.id === id ? {...item, weight: value} : item)
        setForms(data)
    }

    const onchangeCountHandler = ()=>{
        const value = e.currentTarget.value
        const data = forms.map(item => item.id === id ? {...item, count: value} : item)
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
            {forms.map(item => <>
                <Form.Item>
                    <Input onChange={(e: number)=>onchangeExerciseHandler(e,item.id)} value={item.exercise} placeholder="Упражнение"/>
                </Form.Item>

                <Form.Item label="Подходы">
                    <InputNumber onChange={(e)=>onchangeApproachesHandler(e,item.id)} value={item.approaches} addonBefore="+" placeholder={'1'} />
                </Form.Item>

                <Form.Item label="Вес, кг">
                    <InputNumber onChange={(e)=>onchangeWeightHandler(e,item.id)} value={item.weight} placeholder={'0'}/>
                </Form.Item>
                <span>x</span>
                <Form.Item label="Количество">
                    <InputNumber onChange={(e)=>onchangeCountHandler(e,item.id)} value={item.count} placeholder={'3'}/>
                </Form.Item>
            </>)
            }

            <Form.Item>
                <Button type="primary" onClick={handleAddForm}>Добавить еще</Button>
            </Form.Item>

        </Form>


    </Drawer>
}
