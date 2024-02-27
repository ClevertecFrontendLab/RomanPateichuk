import React from 'react'
// import {Navigate} from "react-router-dom";
// import {useAuthMeQuery} from "@redux/api/authApi.ts";

export const Auth: React.FC = ({children})=>{


    // const {error} = useAuthMeQuery('me')


    // if(error){
    //    return <Navigate to='/auth'/>
    // }

    return children

}
