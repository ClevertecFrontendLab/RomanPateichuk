import React from "react";
import {Badge, Button, Space} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {
    useChangeExercisesMutation,
    UserTrainingsType,
    useSendExercisesMutation
} from "@redux/api/trainingApi.ts";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {
    createdExercisesListSelector, currentTrainingSelector, editTrainingNameSelector,
    exercisesListSelector,
    selectedTrainingSelector
} from "@redux/selectors.ts";
import {AppDispatch} from "@redux/configure-store.ts";
import {setEditTrainingName, setIsOpenDrawer} from "@redux/calendarSlice.ts";

interface PopoverContentPropsType {
    createTraining: boolean,
    dailyTrainingList: UserTrainingsType,
    createTrainingModeCallBack: (value: boolean) => void
    date: string
}

export const PopoverContent: React.FC<PopoverContentPropsType> = ({
                                                                      createTraining,
                                                                      date,
                                                                      createTrainingModeCallBack,
                                                                      dailyTrainingList
                                                                  }) => {
    const [sendExercises, {isLoading: isLoadingExercises}] = useSendExercisesMutation()
    const [changeExercises, {isLoading: isLoadingChangeExercises}] = useChangeExercisesMutation()

    const dispatch: AppDispatch = useAppDispatch()

    const editTrainingName = useAppSelector(editTrainingNameSelector)
    const exercisesList = useAppSelector(exercisesListSelector)
    const createdExercisesList = useAppSelector(createdExercisesListSelector)
    const selectedTraining = useAppSelector(selectedTrainingSelector)
    const currentTraining = useAppSelector(currentTrainingSelector)
    const exercises = createdExercisesList.length ? createdExercisesList : exercisesList

    const colors: { [key: string]: string } = {
        'Ноги': '#ff4d4f',
        'Руки': '#13c2c2',
        'Силовая': '#fadb14',
        'Спина': '#fa8c16',
        'Грудь': '#52c41a',
    }

    const openDrawer = () => {
        dispatch(setIsOpenDrawer(true))
    }

    const sendExercisesHandler = async () => {

        if (editTrainingName) {
            console.log(date)
            console.log(selectedTraining)
            console.log(createdExercisesList)
            const trainingId = currentTraining._id
            const data = {
                name: selectedTraining,
                date: date,
                exercises: createdExercisesList
            }

            await changeExercises(trainingId, data)
                .unwrap()
                .then((res) => {
                    //console.log(res)
                    createTrainingModeCallBack(false)

                }).catch((err) => {
                    //console.log(err)
                })
        } else {
            await sendExercises(
                {
                    name: selectedTraining,
                    date: date,
                    exercises: createdExercisesList
                }
            )
                .unwrap()
                .then((res) => {
                    //console.log(res)
                    createTrainingModeCallBack(false)

                }).catch((err) => {
                    //console.log(err)
                })
        }
    }

    const editTrainingHandler = (name: string) => {
        createTrainingModeCallBack(true)
        dispatch(setEditTrainingName(name))
    }

    const editTaskHandler = () => {
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
                        <Button onClick={() => {
                            editTrainingHandler(training.name)
                        }} icon={<EditOutlined/>}/>
                    </Space>
                ))
            ) : (
                <img src="src/assets/empty-image.png" width={32} height={32} alt="no training"/>
            )
        ) : (
            exercises.length ? (
                exercises.map((exercise) => (
                    <Space key={exercise._id}>
                        <div>
                            {exercise.name}
                        </div>
                        <Button onClick={() => editTaskHandler()} icon={<EditOutlined/>}/>
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
                    <Button disabled={!selectedTraining} onClick={() => {
                        openDrawer()
                    }}>Добавить упражнения</Button>
                    <Button disabled={!createdExercisesList.length} onClick={sendExercisesHandler}
                            loading={isLoadingExercises}>Сохранить</Button>
                </Space>
                :
                <Button onClick={() => {
                    createTrainingModeCallBack(true)
                }} style={{width: '100%'}}
                        type='primary'>{!dailyTrainingList.length ? 'Создать тренировку' : 'Добавить тренировку'}</Button>
        }

    </div>
}
