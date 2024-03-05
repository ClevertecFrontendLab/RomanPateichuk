import {createSlice} from "@reduxjs/toolkit";

interface appStateType {
    isShowModal: boolean,
    formData: {
        rate: string,
        message: string,
    },
}


const initialState: appStateType = {
    isShowModal: false,
    formData: {
        rate: '',
        message: '',
    }
}


 const feedbacksSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {
        setShowFeedBacksModal: (state, action)=>{
            state.isShowModal = action.payload
        },
        setFormData: (state, action)=>{
            state.formData = {
                rate: action.payload.rate,
                message: action.payload.message
            }
        }
    }
})

export const { setShowFeedBacksModal } = feedbacksSlice.actions
export default feedbacksSlice.reducer
