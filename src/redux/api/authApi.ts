import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const tokenStorage: string | null = JSON.parse(localStorage.getItem("token"));
const tokenSession: string | null = JSON.parse(sessionStorage.getItem("token"));

let token = '';
if(tokenStorage){
    token = tokenStorage
}
else{
    token = tokenSession
}

console.log('token:', token)
// const [items, setItems] = useState([]);
//
// useEffect(() => {
//     const items = JSON.parse(localStorage.getItem('items'));
//     if (items) {
//         setItems(items);
//     }
// }, []);


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
            // todo
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
            query: (body:any) => ({
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
