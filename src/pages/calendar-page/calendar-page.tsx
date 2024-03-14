import React, {useEffect, useState} from 'react'
import { Button, Modal} from 'antd'
import { Calendar } from 'antd'
import locale from 'antd/es/date-picker/locale/ru_RU'
import type { Moment } from 'moment'
import moment from 'moment'
import 'moment/locale/ru'
import {
    TrainingsListType,
    useGetTrainingListQuery,
    // useGetTrainingQuery
} from "@redux/api/trainingApi.ts"

moment.locale('ru');

//получаем массив с тренировками
// [{date, ...}]


// const getListData = (value: Moment) => {
//     console.log('value ', value.creationData())
//     let listData;
//     switch (value.date()) {
//         case 8:
//             listData = [
//                 { type: 'warning', content: 'This is warning event.' },
//                 { type: 'success', content: 'This is usual event.' },
//             ];
//             break;
//         case 10:
//             listData = [
//
//             ];
//             break;
//         case 15:
//             listData = [
//
//             ];
//             break;
//         default:
//     }
//     return listData || [];
// }
const getMonthData = (value: Moment) => {
    if (value.month() === 8) {
        return 1394;
    }
}
moment.updateLocale('ru', {
    week : {
        dow : 1,
        doy : 0
    }
})




export const CalendarPage: React.FC = ()=> {
    const monthCellRender = (value: Moment) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const fetchedTasks = [
        { name: "Задача 1", date: "2024-03-15" },
        { name: "Задача 2", date: "2024-03-22" },
        // Добавьте другие задачи
    ];

    const dateCellRender = (value: Moment) => {

        const formattedDate = value.format("YYYY-MM-DD");
        const dailyTasks = fetchedTasks.filter(task => task.date === formattedDate);

        return (
            <ul className="tasks">
                {dailyTasks.map((task, index) => (
                    <li key={index}>{task.name}</li>
                ))}
            </ul>
        );
    };

    const calendarLocale = {
        ...locale,
        lang:{
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

    //const {data: training = []} = useGetTrainingQuery()
    const {data: trainingList = []} = useGetTrainingListQuery()
    const [list, setList] = useState<TrainingsListType>([])
    const [showModal, setShowModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const [tasksForSelectedDate, setTasksForSelectedDate] = useState<Array<{name: string, date: string}> | null>()
    useEffect(() => {
        trainingList && setList(trainingList)
    }, [trainingList]);

    console.log(list)

    const onSelectHandler = (date: Moment)=>{
        const isPastDate = date ? moment(date).isBefore(moment(), 'day') : false
        console.log(date)
        console.log(isPastDate)

        const selectedDate = date.format('YYYY-MM-DD');
        const tasksForSelectedDate = fetchedTasks.filter(task => task.date === selectedDate);

        if(tasksForSelectedDate.length){
            setTasksForSelectedDate(tasksForSelectedDate)
        }
        else{
            setTasksForSelectedDate(null)
        }
        setShowModal(true)
        setSelectedDate(selectedDate)
    }


    return <>
        <Modal open={showModal}
               title={`Тренировки на ${selectedDate}`}
               onCancel={()=>{setShowModal(false)}}
                footer={[<Button>{tasksForSelectedDate ? 'Добавить тренировку' : 'Создать тренировку'}</Button>]}
                >
            {tasksForSelectedDate
                ?
                tasksForSelectedDate.map(item => <div key={item.date}>{item.name}</div>)
                : <p>Нет активных тренировок</p>
            }
        </Modal>
        <Calendar onSelect={onSelectHandler} locale={calendarLocale}  dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    </>
}

