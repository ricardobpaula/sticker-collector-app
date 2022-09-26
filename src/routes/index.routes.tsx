import React from "react"
import { Loading } from "../components/loading/loading"
import { useAuth } from "../hooks/useAuth"
import { AppRoutes } from "./app.routes"
import { AuthRoutes } from './auth.routes'

export const Routes:React.FC = () => {
    const { signed, loading } = useAuth()

    if(loading) return <Loading />
    
    return signed ? <AppRoutes /> : <AuthRoutes />
}