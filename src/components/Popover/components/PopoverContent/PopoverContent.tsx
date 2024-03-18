import React from "react";
import {Badge, Button, Space} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {UserTrainingsType} from "@redux/api/trainingApi.ts";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {exercisesListSelector, selectedTrainingSelector} from "@redux/selectors.ts";
import {AppDispatch} from "@redux/configure-store.ts";
import {setIsOpenDrawer} from "@redux/calendarSlice.ts";

interface PopoverContentPropsType{
    createTraining: boolean,
    dailyTrainingList: UserTrainingsType,
    createTrainingHandlerCallBack: ()=>void
}

export const PopoverContent: React.FC<PopoverContentPropsType> =({createTraining,createTrainingHandlerCallBack, dailyTrainingList})=> {

    const exercisesList = useAppSelector(exercisesListSelector)
    const selectedTraining = useAppSelector(selectedTrainingSelector)
    const dispatch: AppDispatch = useAppDispatch()

    const colors: {[key: string]: string } = {
        'Ноги': '#ff4d4f',
        'Руки': '#13c2c2',
        'Силовая': '#fadb14',
        'Спина': '#fa8c16',
        'Грудь': '#52c41a',
    }

    const openDrawer = ()=>{
        console.log('!!')
        dispatch(setIsOpenDrawer(true))
    }

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
    }}>

        {!createTraining ? (

            dailyTrainingList.length ? (
                dailyTrainingList.map((training) => (
                    <Space key={training._id}>
                        <Badge
                            color={training.name in colors ? colors[training.name] : 'green'}
                            text={training.name}
                        />
                        <Button icon={<EditOutlined/>}/>
                    </Space>
                ))
            ) : (
                <img src="src/assets/empty-image.png" width={32} height={32} alt="no training"/>
            )
        ) : (
            exercisesList.length ? (
                exercisesList.map((exercise) => (
                    <Space key={exercise._id}>
                        <div>
                            {exercise.name}
                        </div>
                        <Button icon={<EditOutlined/>}/>
                    </Space>
                ))
            ) : (
                (!createTraining ? <img src="src/assets/empty-image.png" width={32} height={32}
                                        alt="no exercises"/> : null)
            )
        )}

        {
            createTraining
                ?
                <Space>
                    <Button disabled={selectedTraining? false : true} onClick={()=>{openDrawer()}}>Добавить упражнения</Button>
                    <Button>Сохранить</Button>
                </Space>
                :
                <Button onClick={createTrainingHandlerCallBack} style={{width: '100%'}}
                        type='primary'>{!dailyTrainingList.length ? 'Создать тренировку' : 'Добавить тренировку'}</Button>
        }

    </div>
}
