import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
import {authApi} from "./api/authApi"
import {feedBackApi} from "./api/feedBackApi"

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
        router: routerReducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([routerMiddleware, authApi.middleware, feedBackApi.middleware ]),
});


export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


