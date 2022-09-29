import React, { ReactNode, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialIcon from '@expo/vector-icons/MaterialIcons'
import { Dashboard } from '../screens/dashboard/dashboard'
import { Settings } from '../screens/settings/settings'
import { colors } from '../styles/theme'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StickerForm } from '../screens/sticker-form/sticker-form'
import { useRoute } from '@react-navigation/native'

const { Navigator, Screen } = createBottomTabNavigator()
const { Navigator: NavigatorStack, Screen:ScreenStack } = createNativeStackNavigator()

export type DashboardStackParamsList = {
    Dashboard: undefined
    StickerForm: {
        sticker: Sticker
        sectionCode: string
    }
}

const DashboardStack:React.FC = () => {
    return (
        <NavigatorStack
            screenOptions={{headerStyle: {
                backgroundColor: colors.gray[700]
            },
            headerTintColor: colors.secondary[700]
        }}
        >

            <ScreenStack
                name='Dashboard'
                component={Dashboard} 
                options={{headerShown: false}}
            />
            
            <ScreenStack name='StickerForm' component={StickerForm} />
            
        </NavigatorStack>
    )
}

export const AppRoutes:React.FC = () => {
    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.secondary[500],
            tabBarInactiveTintColor: colors.gray[100],
            tabBarStyle: {
                backgroundColor: colors.gray[700]
            }
        }}>
            <Screen 
                name='DashboardStack'
                component={DashboardStack}
                options={{
                    tabBarIcon: () => <MaterialIcon 
                                        name='sports-soccer'
                                        size={25}
                                        color={colors.gray[100]}
                                    />
                }}
            />
            <Screen 
                name='Settings'
                component={Settings}
                options={{
                    tabBarIcon: () => <MaterialIcon 
                                        name='settings'
                                        size={25}
                                        color={colors.gray[100]}
                                    />
                }}
            />
        </Navigator>
    )
}