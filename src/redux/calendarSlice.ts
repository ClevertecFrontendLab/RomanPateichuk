import {createSlice} from "@reduxjs/toolkit";
import {Exercise, TrainingsListType, UserTrainingsType} from "@redux/api/trainingApi.ts";

interface appStateType {
    trainingsList: TrainingsListType
    exercisesList: Exercise[]
    personalTrainingsList: UserTrainingsType
    isOpenDrawer: boolean
    selectedTraining: string
}


const initialState: appStateType = {
    trainingsList: [],
    exercisesList: [],
    personalTrainingsList: [],
    isOpenDrawer: false,
    selectedTraining: '',
}


const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setTrainingsList: (state, action)=>{
            state.trainingsList = action.payload
        },
        setExercisesList: (state, action)=>{
            state.exercisesList = action.payload
        },
        setPersonalTrainingsList: (state, action)=>{
            state.personalTrainingsList = action.payload
        },
        setIsOpenDrawer: (state, action)=>{
            state.isOpenDrawer = action.payload
        },
        setSelectedTraining: (state, action)=>{
            state.selectedTraining = action.payload
        },

    }
})

export const {setSelectedTraining, setIsOpenDrawer, setTrainingsList, setExercisesList, setPersonalTrainingsList } = calendarSlice.actions
export default calendarSlice.reducer
