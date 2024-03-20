import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {
    Button,
    CheckboxProps,
    Drawer,
    Checkbox,
    Form,
    Input,
    InputNumber,
    Space,
    Typography
} from "antd";
import {
    editTrainingNameSelector, exercisesListSelector,
    isOpenDrawerSelector,
    selectedTrainingSelector
} from "@redux/selectors.ts";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {AppDispatch} from "@redux/configure-store.ts";
import {setCreatedExercisesList, setExercisesList, setIsOpenDrawer} from "@redux/calendarSlice.ts";
import {CloseOutlined, EditFilled, PlusOutlined} from "@ant-design/icons";
import {v1} from "uuid";
import {Moment} from "moment";

const {Title, Text} = Typography;

export const DrawerComponent: React.FC<DrawerComponentPropsType> = React.memo(() => {
    const dispatch: AppDispatch = useAppDispatch()
    const selectedTraining = useAppSelector(selectedTrainingSelector)
    const isOpenDrawer = useAppSelector(isOpenDrawerSelector)
    const editTrainingName = useAppSelector(editTrainingNameSelector)
    const exercisesList = useAppSelector(exercisesListSelector)
    const [checked, setChecked] = useState(false);

    const [forms, setForms] = useState(editTrainingName ? exercisesList : [
        {
            _id: v1(),
            name: '',
            replays: null,
            weight: null,
            approaches: null,
            isImplementation: false
        }
    ])

    useEffect(() => {
        setForms(editTrainingName ? exercisesList : [
            {
                _id: v1(),
                name: '',
                replays: null,
                weight: null,
                approaches: null,
                isImplementation: false
            }
        ])
    }, [exercisesList, editTrainingName]);

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

        // если CreatedExercisesList не пустой, то сравнить с filterList и если они одинаковые,
        // то ничего не отправлять кнопка сохранить disabled

        dispatch(setCreatedExercisesList(filterList.map(({_id, ...rest}) => rest)))

    }

    const onchangeExerciseHandler = (e: ChangeEvent<HTMLInputElement>, _id: sting) => {
        const value = e.currentTarget.value
        const data = forms.map(item => item._id === _id ? {...item, name: value} : item)
        setForms(data)
    }


    const onchangeApproachesHandler = (value: number, _id: sting) => {
        const data = forms.map(item => item._id === _id ? {...item, approaches: value} : item)
        setForms(data)
    }

    const onchangeWeightHandler = (value: number, _id: sting) => {
        const data = forms.map(item => item._id === _id ? {...item, weight: value} : item)
        setForms(data)
    }

    const onchangeReplaysHandler = (value: number, _id: sting) => {
        const data = forms.map(item => item._id === _id ? {...item, replays: value} : item)
        setForms(data)
    }

    const onChange: CheckboxProps['onChange'] = (e) => {
        setChecked(e.target.checked);
    };

    const deleteHandler = () => {
        console.log('')
    }


    return <Drawer title={<Space align="center">
        {editTrainingName ? <EditFilled/> : <PlusOutlined/>}
        <Title level={4}>{editTrainingName ? 'Редактирование' : 'Добавление упражнений'}</Title>
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
                    <Input autoFocus
                           onChange={(e: ChangeEvent<HTMLInputElement>) => onchangeExerciseHandler(e, item._id)}
                           value={item.name} placeholder="Упражнение"/>
                </Form.Item>

                {editTrainingName && <Form.Item>
                    <Checkbox checked={checked} onChange={onChange}></Checkbox>
                </Form.Item>}

                <Form.Item label="Подходы">
                    <InputNumber
                        min={1}
                        onChange={(value: number) => onchangeApproachesHandler(value, item._id)}
                        defaultValue={item.approaches} addonBefore="+" placeholder={'1'}/>
                </Form.Item>

                <Form.Item label="Вес, кг">
                    <InputNumber min={0}
                                 onChange={(value: number) => onchangeWeightHandler(value, item._id)}
                                 defaultValue={item.weight} placeholder={'0'}/>
                </Form.Item>
                <span>x</span>
                <Form.Item label="Количество">
                    <InputNumber min={1}
                                 onChange={(value: number) => onchangeReplaysHandler(value, item._id)}
                                 defaultValue={item.replays} placeholder={'3'}/>
                </Form.Item>
            </div>)
            }

            <Form.Item>
                <Button type="primary" onClick={handleAddForm}>Добавить еще</Button>
            </Form.Item>

            {editTrainingName && <Form.Item>
                <Button disabled onClick={deleteHandler}>Удалить</Button>
            </Form.Item>}

        </Form>


    </Drawer>
})
