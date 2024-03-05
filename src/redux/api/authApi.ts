import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getStorageItem} from "@utils/index.ts";

export const authApi = createApi({
    reducerPath: 'authApi',
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
        authMe: build.query({
            query: (me) => `/user/${me}`,
        }),

        login: build.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
        }),

        registration: build.mutation({
            query: (body) => ({
                url: '/auth/registration',
                method: 'POST',
                body,
            }),
        }),

        checkEmail: build.mutation({
            query: (body) => ({
                url: '/auth/check-email',
                method: 'POST',
                body,
            }),
        }),

        confirmEmail: build.mutation({
            query: (body) => ({
                url: '/auth/confirm-email',
                method: 'POST',
                body,
            }),
        }),

        changePassword: build.mutation({
            query: (body) => ({
                url: '/auth/change-password',
                method: 'POST',
                body,
            }),
        }),

    })
})

export const {
    useChangePasswordMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useLoginMutation,
    useRegistrationMutation
} = authApi
