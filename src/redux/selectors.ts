import {RootState} from "@redux/configure-store.ts";

export const isShowModalSelector = (state: RootState) => state.feedbacks.isShowModal

export const prevLocationSelector = (state: RootState) => state.router.previousLocations ? state.router.previousLocations[1]?.location.pathname : ''

export const AppStatusSelector = (state: RootState) => state.app.status

export const trainingListSelector = (state: RootState) => state.calendar.trainingsList

export const trainingPersonalListSelector = (state: RootState)=> state.calendar.personalTrainingsList

export const exercisesListSelector = (state: RootState)=> state.calendar.exercisesList

export const isOpenDrawerSelector = (state: RootState)=> state.calendar.isOpenDrawer

export const selectedTrainingSelector = (state: RootState)=>state.calendar.selectedTraining

export const createdExercisesListSelector = (state: RootState)=>state.calendar.createdExercisesList

export const currentTrainingSelector = (state: RootState)=>state.calendar.currentTraining

export const editTrainingNameSelector = (state: RootState)=>state.calendar.editTrainingName
