import {createSlice} from "@reduxjs/toolkit";
import {Exercise, Training, TrainingsListType, UserTrainingsType} from "@redux/api/trainingApi.ts";

interface appStateType {
    trainingsList: TrainingsListType
    exercisesList: Exercise[]
    createdExercisesList: Exercise[]
    personalTrainingsList: UserTrainingsType
    isOpenDrawer: boolean
    selectedTraining: string
    currentTraining: Training
    editTrainingName: string
}


const initialState: appStateType = {
    trainingsList: [],
    exercisesList: [],
    createdExercisesList: [],
    personalTrainingsList: [],
    isOpenDrawer: false,
    selectedTraining: '',
    currentTraining: {},
    editTrainingName: ''
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

        setCreatedExercisesList: (state, action)=>{
            state.createdExercisesList = action.payload
        },
        setCurrentTraining: (state, action)=>{
            state.currentTraining = action.payload
        },
        setEditTrainingName: (state, action)=>{
            state.editTrainingName = action.payload
        }

    }
})

export const {setEditTrainingName, setCurrentTraining, setCreatedExercisesList, setSelectedTraining, setIsOpenDrawer, setTrainingsList, setExercisesList, setPersonalTrainingsList } = calendarSlice.actions
export default calendarSlice.reducer
