import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack' 
import { SignUp } from '../screens/sign-up/sign-up'
import { Login } from '../screens/login/login'

const { Navigator, Screen } = createNativeStackNavigator()

export type AuthStackParamsList = {
    SignUp: undefined
    Login: undefined
}

export const AuthRoutes:React.FC = () => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="SignUp" component={SignUp} /> 
            <Screen name="Login" component={Login} />          
        </Navigator>
    )
}