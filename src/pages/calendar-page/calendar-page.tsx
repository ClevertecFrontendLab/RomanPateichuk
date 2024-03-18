import React, {useEffect, useState} from 'react'
import {Calendar} from 'antd'
import locale from 'antd/es/date-picker/locale/ru_RU'
import type {Moment} from 'moment'
import moment from 'moment'
import 'moment/locale/ru'
import {
    useGetTrainingListQuery,
    useGetTrainingQuery, UserTrainingsType
} from "@redux/api/trainingApi.ts"

import {Popover} from "@components/Popover";
import {useDispatch} from "react-redux";
import {setPersonalTrainingsList, setTrainingsList} from "@redux/calendarSlice.ts";
import {DrawerComponent} from "@components/Popover/components/DrawerComponent/DrawerComponent.tsx";


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

    const {data: personaTrainingList = []} = useGetTrainingQuery()
    const {data: trainingList = []} = useGetTrainingListQuery()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTrainingsList(trainingList))
    }, [trainingList]);

    useEffect(() => {
        dispatch(setPersonalTrainingsList(personaTrainingList))
    }, [personaTrainingList]);

    const monthCellRender = (value: Moment) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }

    const dateCellRender = (date: Moment) => {
        return (
           <Popover date={date}/>
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
        //console.log(date)
        // const isPastDate = date ? moment(date).isBefore(moment(), 'day') : false

    }

    return <>
        <DrawerComponent/>
        <Calendar onSelect={onSelectHandler} locale={calendarLocale} dateCellRender={dateCellRender}
                  monthCellRender={monthCellRender}/>
    </>
}
