import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AuthProvider } from "../contexts/auth";
import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from './auth.routes'

export const Routes:React.FC = () => {
    const { signed } = useAuth()
    
    return signed ? <AppRoutes /> : <AuthRoutes />
}