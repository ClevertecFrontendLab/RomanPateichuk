import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getStorageItem} from "@utils/index.ts";

export type UserTrainingsType = Array<Training> | []

export interface Training {
    _id: string
    name: string
    date: string
    isImplementation: boolean
    userId: string
    parameters: Parameters
    exercises: Exercise[]
}

export interface Parameters {
    repeat: boolean
    period: number
    jointTraining: boolean
    participants: string[]
}

export interface Exercise {
    _id: string
    name: string
    replays: number
    weight: number
    approaches: number
    isImplementation: boolean
}

export type TrainingsListType = TrainingType[] | []

export interface TrainingType {
    name: string
    key: string
}


export const trainingApi = createApi({
    reducerPath: 'trainingApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'https://marathon-api.clevertec.ru/',
            prepareHeaders: (headers) => {
                const tokenStorage = getStorageItem(localStorage, "token")
                const tokenSession = getStorageItem(sessionStorage, "token")

                const token = tokenStorage || tokenSession

                if (token) {
                    headers.set('Authorization', `Bearer ${token}`)
                }

                return headers;
            },
        }),

    endpoints: (build) => ({
        getTraining: build.query<UserTrainingsType, void>({
            query: () => `/training`,
        }),
        getTrainingList: build.query<TrainingsListType, void>({
            query: () => `/catalogs/training-list`,
        }),
    }),


})

export const {
    useGetTrainingQuery,
    useGetTrainingListQuery,
} = trainingApi
