import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getStorageItem} from "@utils/index.ts";

const tokenStorage = getStorageItem(localStorage, "token");
const tokenSession = getStorageItem(sessionStorage, "token");

const token = tokenStorage || tokenSession;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery(
        {
        baseUrl: 'https://marathon-api.clevertec.ru/',
        credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`,
            },
    }),

    endpoints: (build) => ({
        authMe: build.query({
            query: (me)=> `/user/${me}`,
        }),

        authWithGoogle: build.query({
            query: () => "/auth/google",
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

export const {useChangePasswordMutation, useConfirmEmailMutation, useCheckEmailMutation, useAuthMeQuery, useAuthWithGoogleQuery, useLoginMutation, useRegistrationMutation } = authApi
