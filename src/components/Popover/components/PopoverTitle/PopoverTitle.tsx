import React, {useCallback, useEffect} from "react";
import {Button, Select, Space, Typography} from "antd";
import {ArrowLeftOutlined, CloseOutlined} from "@ant-design/icons";
import {Moment} from "moment";
import {UserTrainingsType} from "@redux/api/trainingApi.ts";
import {
    setCreatedExercisesList, setCurrentTraining,
    setExercisesList, setIsOpenPopover,
    setSelectedTraining
} from "@redux/calendarSlice.ts";
import {
    editTrainingName, editTrainingNameSelector,
    selectedTrainingSelector,
    trainingListSelector,
    trainingPersonalListSelector
} from "@redux/selectors.ts";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {AppDispatch} from "@redux/configure-store.ts";
const {Text} = Typography;

interface PopoverTitlePropsType {
    createTraining: boolean,
    dailyTrainingList: UserTrainingsType,
    date: Moment,
    setOpenPopoverCallBack: ()=>void
}

export const PopoverTitle: React.FC<PopoverTitlePropsType> =React.memo(({createTraining, date, dailyTrainingList, setOpenPopoverCallBack })=> {

    const dispatch: AppDispatch = useAppDispatch()

    const trainingList = useAppSelector(trainingListSelector)
    const editTrainingName = useAppSelector(editTrainingNameSelector)

    const plannedTrainingNames = dailyTrainingList.map(training => training.name);
    const availableTrainingsFiltered = trainingList.filter(training => !plannedTrainingNames.includes(training.name));
    const options = availableTrainingsFiltered.map(item => ({value: item.name, label: item.name}))


    const handleChangeSelect = useCallback((value: string) => {
        dispatch(setSelectedTraining(value))
        //console.log(date)
        //console.log(options)
        const currentTraining = dailyTrainingList.find(el => el.name === value)
        //console.log(currentTraining)
        if(typeof currentTraining === 'undefined'){
            dispatch(setExercisesList([]))
        }


        currentTraining && dispatch(setExercisesList(currentTraining.exercises))
        currentTraining && dispatch(setCurrentTraining(currentTraining))
    }, [])

    useEffect(() => {
        handleChangeSelect(editTrainingName)
    }, [editTrainingName]);

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
                    defaultValue={editTrainingName || null}
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
            onClick={() => {
                setOpenPopoverCallBack()
                dispatch(setCreatedExercisesList([]))
            }}
        />

    </Space>
})
