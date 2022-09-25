import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AuthRoutes } from './auth.routes'

export const Routes:React.FC = () => {
    return (
        <NavigationContainer>
            <AuthRoutes />
        </NavigationContainer>
    )
}