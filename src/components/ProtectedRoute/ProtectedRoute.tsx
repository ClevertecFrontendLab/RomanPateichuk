import {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import {getStorageItem} from "@utils/index.ts";

interface ProtectedRouteProps {
    children: ReactNode;
}


export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const tokenStorage = getStorageItem(localStorage, "token");
    const tokenSession = getStorageItem(sessionStorage, "token");
    const token = tokenStorage || tokenSession;

    return token ? children : <Navigate to="/auth" replace />;
};
