import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
import {authApi} from "./api/authApi"

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
        router: routerReducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([routerMiddleware, authApi.middleware ]),
});


export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


