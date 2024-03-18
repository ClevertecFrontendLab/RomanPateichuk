import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice'
import feedbacksReducer from './feedbacksSlice'
import calendarReducer from './calendarSlice'
import { combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
import {authApi} from "./api/authApi"
import {feedBackApi} from "./api/feedBackApi"
import {trainingApi} from "@redux/api/trainingApi.ts";

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory(),
    savePreviousLocations: 1
});



export const store = configureStore({
    reducer: combineReducers({
        [authApi.reducerPath]: authApi.reducer,
        [feedBackApi.reducerPath]: feedBackApi.reducer,
        [trainingApi.reducerPath]: trainingApi.reducer,
        app: appReducer,
        router: routerReducer,
        feedbacks: feedbacksReducer,
        calendar: calendarReducer,

    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([routerMiddleware, authApi.middleware, feedBackApi.middleware, trainingApi.middleware ]),
});


export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


