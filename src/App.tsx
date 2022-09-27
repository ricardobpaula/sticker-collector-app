import React, { Fragment } from 'react'
import { Routes } from './routes/index.routes'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './contexts/auth'

export const App:React.FC = () => {
  return (
    <Fragment>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar style='light' translucent />
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </Fragment>
  )
}