import React, {useCallback, useState} from "react";
import {Badge, Popover} from "antd";


import moment, {Moment} from "moment/moment";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {
    isOpenDrawerSelector,
    trainingPersonalListSelector
} from "@redux/selectors.ts";

import {PopoverTitle} from "@components/Popover/components/PopoverTitle/PopoverTitle.tsx";
import {setEditTrainingName, setExercisesList, setSelectedTraining} from "@redux/calendarSlice.ts";
import {PopoverContent} from "@components/Popover/components/PopoverContent/PopoverContent.tsx";
import {AppDispatch} from "@redux/configure-store.ts";

interface PopoverComponentPropType {
    date: Moment
}

export const PopoverComponent: React.FC<PopoverComponentPropType> = React.memo(({date})=> {
    const [openPopover, setOpenPopover] = useState(false)
    const [createTraining, setCreateTraining] = useState(false)
    const trainingPersonalList =useAppSelector(trainingPersonalListSelector)

    const formattedDate = moment.utc(date).startOf('day').toISOString();

    const dailyTrainingList = trainingPersonalList.filter(training => training.date === formattedDate)

    const dispatch: AppDispatch = useAppDispatch()
    const isOpenDrawer = useAppSelector(isOpenDrawerSelector)

    const onOpenChangeHandler = (open: boolean)=>{
        if(isOpenDrawer){
            return;
        }
        dispatch(setExercisesList([]))
        dispatch(setSelectedTraining(''))
        dispatch(setEditTrainingName(''))
        setCreateTraining(false)
        setOpenPopover(open)
    }

    const createTrainingHandler = useCallback((value: boolean)=>{
        setCreateTraining(value)
    },[])

    const colors: {[key: string]: string } = {
        'Ноги': '#ff4d4f',
        'Руки': '#13c2c2',
        'Силовая': '#fadb14',
        'Спина': '#fa8c16',
        'Грудь': '#52c41a',
    }

    const CommonHandleChangeSelectCallBack = (value: string)=>{
        alert(value)
    }

    return <Popover
        open={openPopover}
        title={() => (<PopoverTitle callHandleChangeSelectCallBack={CommonHandleChangeSelectCallBack} dailyTrainingList={dailyTrainingList} date={date} createTraining={createTraining} setOpenPopoverCallBack={()=>{setOpenPopover(false)}}/> )}
        showArrow={false}
        align={{offset: [-7, 172]}}
        trigger='click'
        placement='topLeft'
        onOpenChange={(open: boolean)=> onOpenChangeHandler(open)}
        content={<PopoverContent createTraining={createTraining}
                                 createTrainingModeCallBack={createTrainingHandler}
                                 dailyTrainingList={dailyTrainingList}
                                 date={formattedDate}
            />

    }
    >
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%'
        }}>
            {
                dailyTrainingList && dailyTrainingList.map((training) => (
                    <Badge key={training._id} color={training.name in colors ? colors[training.name] : '\'green\''}
                           text={training.name}/>
                ))
            }
        </div>

    </Popover>

})
