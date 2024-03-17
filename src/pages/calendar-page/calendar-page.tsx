import React, {useEffect, useState} from 'react'
import {Badge, Button, Form, Modal, Select, Space} from 'antd'
import {Calendar} from 'antd'
import locale from 'antd/es/date-picker/locale/ru_RU'
import styles from './calendar-page.module.scss'
import type {Moment} from 'moment'
import moment from 'moment'
import 'moment/locale/ru'
import {
    TrainingsListType,
    useGetTrainingListQuery,
    useGetTrainingQuery, UserTrainingsType
} from "@redux/api/trainingApi.ts"
import {ArrowLeftOutlined, EditOutlined} from "@ant-design/icons"

moment.locale('ru')

const getMonthData = (value: Moment) => {
    if (value.month() === 8) {
        return 1394;
    }
}
moment.updateLocale('ru', {
    week: {
        dow: 1,
        doy: 0
    }
})


export const CalendarPage: React.FC = () => {

    const {data: trainingPersonal = []} = useGetTrainingQuery()
    const {data: trainingList = []} = useGetTrainingListQuery()

    const [list, setList] = useState<TrainingsListType>([])
    const [trainingPersonalList, setTrainingPersonalList] = useState<UserTrainingsType>([])
    const [showTrainingModal, setShowTrainingModal] = useState(false)
    const [showCreateTrainingModal, setShowCreateTrainingModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')

    const [tasksForSelectedDate, setTasksForSelectedDate] = useState<Array<{
        name: string,
        date: string
    }> | null>()

    const [exercises, setExercises] = useState()

    useEffect(() => {
        trainingList && setList(trainingList)
    }, [trainingList]);

    useEffect(() => {
        trainingPersonalList && setTrainingPersonalList(trainingPersonal)
    }, [trainingPersonal]);

    const monthCellRender = (value: Moment) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }

    const colors = {
        'Ноги': '#ff4d4f',
        'Руки': '#13c2c2',
        'Силовая': '#fadb14',
        'Спина': '#fa8c16',
        'Грудь': '#52c41a',
    }

    const dateCellRender = (date: Moment) => {
        const formattedDate = moment.utc(date).startOf('day').toISOString();
        const dailyTraining = trainingPersonal.filter(training => training.date === formattedDate);

        return (
            <ul>
                {dailyTraining.map((training) => (
                        <Badge key={training._id} color={colors[training.name]} text={training.name}/>
                    )
                )}
            </ul>
        )
    }

    const calendarLocale = {
        ...locale,
        lang: {
            ...locale.lang,
            shortMonths: [
                'Янв',
                'Фев',
                'Мар',
                'Апр',
                'Май',
                'Июн',
                'Июл',
                'Авг',
                'Сен',
                'Окт',
                'Ноя',
                'Дек'
            ],
            shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        },


    }


    const onSelectHandler = (date: Moment) => {
        const isPastDate = date ? moment(date).isBefore(moment(), 'day') : false

        const selectedDate = moment.utc(date).startOf('day').toISOString();
        const tasksForSelectedDate = trainingPersonal.filter(training => training.date === selectedDate);

        if (tasksForSelectedDate.length) {
            setTasksForSelectedDate(tasksForSelectedDate)
            console.log(tasksForSelectedDate)
        } else {
            setTasksForSelectedDate(null)
        }
        setShowTrainingModal(true)
        setSelectedDate(selectedDate)
    }

    const createTrainingHandler = () => {
        setShowTrainingModal(false)
        setShowCreateTrainingModal(true)
    }

    const options = list.map(item => ({value: item.name, label: item.name}))

    const handleChangeSelect = (value: string) => {
        const findExercises = tasksForSelectedDate.find(el => el.name === value)?.exercises
        setExercises(findExercises)
    }


    return <>
        <Modal open={showTrainingModal}
               title={`Тренировки на ${selectedDate}`}
               onCancel={() => {
                   setShowTrainingModal(false)
               }}
               footer={[
                   <Button
                       onClick={createTrainingHandler}>{tasksForSelectedDate ? 'Добавить тренировку' : 'Создать тренировку'}</Button>]}
        >
            {tasksForSelectedDate
                ?
                tasksForSelectedDate.map(item => (
                    <Space key={item._id}>
                        <Badge color={colors[item.name]} text={item.name}></Badge>
                        <Button icon={<EditOutlined/>}/>
                    </Space>))
                : <p>Нет активных тренировок</p>
            }
        </Modal>
        <Modal
            className={styles.createTrainingModal}
            open={showCreateTrainingModal}
            footer={<Form.Item>
                <Button>Добавить упражнения</Button>
                <Button>Сохранить</Button>
            </Form.Item>}
            title={<Form.Item>
                <Select
                    placeholder="Выбор типа тренировки"
                    options={options}
                    onChange={handleChangeSelect}
                ></Select>
            </Form.Item>}
            onCancel={() => {
                setShowCreateTrainingModal(false)
                setExercises(null)
            }}
            closeIcon={<ArrowLeftOutlined/>}
        >
            <Form>
                {
                    exercises && exercises.map(item => (
                    <Space key={item._id}>
                        <div>{item.name}</div>
                        <Button icon={<EditOutlined/>}/>
                    </Space>))
                }

            </Form>
        </Modal>
        <Calendar onSelect={onSelectHandler} locale={calendarLocale} dateCellRender={dateCellRender}
                  monthCellRender={monthCellRender}/>
    </>
}

