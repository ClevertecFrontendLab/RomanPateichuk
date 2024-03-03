import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getStorageItem} from "@utils/index.ts";

const tokenStorage = getStorageItem(localStorage, "token");
const tokenSession = getStorageItem(sessionStorage, "token");

const token = tokenStorage || tokenSession;

export const feedBackApi = createApi({
    reducerPath: 'feedBackApi',
    tagTypes: ['Feedbacks'],
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'https://marathon-api.clevertec.ru/',
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),

    endpoints: (build) => ({
        getFeedBack: build.query({
            query: () => `/feedback`,
            providesTags: (result) =>
                result
                    ? [
                        { type: 'Feedbacks', id: 'LIST' },
                        ...result.map(({ id }) => ({ type: 'Feedbacks' as const, id })),
                    ]
                    : [{ type: 'Feedbacks', id: 'LIST' }],
        }),
        sendFeedBack: build.mutation({
            query: (body) => ({
                url: '/feedback',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Feedbacks', id: 'LIST' }]
        }),
    }),


})

export const {
    useGetFeedBackQuery,
    useSendFeedBackMutation
} = feedBackApi
