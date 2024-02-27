import React, {PropsWithChildren, useEffect} from 'react'
import {Navigate, useNavigate} from "react-router-dom";

export const ProtectedRoute: React.FC = ({children}: PropsWithChildren)=>{
    const navigate = useNavigate()
    const tokenStorage = JSON.parse(localStorage.getItem("token"));
    const tokenSession = JSON.parse(sessionStorage.getItem("token"));
    let token = '';
    if(tokenStorage){
        token = tokenStorage
    }
    else{
        token = tokenSession
    }
    //const {data, error, isLoading} = useAuthMeQuery('me')

    useEffect(() => {
        if(!token){
            return navigate('/auth')
        }
        else {
            return navigate('/main')
        }
    }, []);




    return children

}
