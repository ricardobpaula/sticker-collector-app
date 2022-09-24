import React, { Fragment } from 'react'
import { Routes } from './routes/index.routes'
import { StatusBar } from 'expo-status-bar'

export const App:React.FC = () => {
  return (
    <Fragment>
      <StatusBar style='light' translucent />
      <Routes />
    </Fragment>
  )
}