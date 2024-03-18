import React from "react";
import {Button, Select, Space, Typography} from "antd";
import {ArrowLeftOutlined, CloseOutlined} from "@ant-design/icons";
import {Moment} from "moment";
import {UserTrainingsType} from "@redux/api/trainingApi.ts";
import {setExercisesList, setSelectedTraining} from "@redux/calendarSlice.ts";
import {selectedTrainingSelector, trainingListSelector} from "@redux/selectors.ts";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {AppDispatch} from "@redux/configure-store.ts";
const {Text} = Typography;

interface PopoverTitlePropsType {
    createTraining: boolean,
    dailyTrainingList: UserTrainingsType,
    date: Moment,
    setOpenPopoverCallBack: ()=>void
}

export const PopoverTitle: React.FC<PopoverTitlePropsType> =({createTraining, date, dailyTrainingList, setOpenPopoverCallBack})=> {
    const dispatch: AppDispatch = useAppDispatch()

    const trainingList = useAppSelector(trainingListSelector)

    const options = trainingList.map(item => ({value: item.name, label: item.name}))

    const handleChangeSelect = (value: string) => {
        dispatch(setSelectedTraining(value))
        const findExercises = dailyTrainingList.find(el => el.name === value)
        if(typeof findExercises === 'undefined'){
            dispatch(setExercisesList([]))
        }

        findExercises && dispatch(setExercisesList(findExercises.exercises))
    }

    return <Space
        style={{
            width: '240px',
            minHeight: '100%',
            paddingTop: '0.7rem',
        }}
        size={0.5}
    >
        {
            createTraining
                ?
                <Select
                    placeholder="Выбор типа тренировки"
                    options={options}
                    onChange={handleChangeSelect}
                ></Select>
                :
                <Text strong>{`Тренировки на ${date.format('DD.MM.YYYY')}`}</Text>
        }


        {
            (!dailyTrainingList.length && !createTraining)
                ?
                <Text type='secondary'>Нет активных тренировок</Text>
                : null
        }
        <Button
            type='link'
            icon={createTraining ? <ArrowLeftOutlined />: <CloseOutlined/>}
            onClick={() => setOpenPopoverCallBack()}
        />

    </Space>
}
