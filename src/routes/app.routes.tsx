import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialIcon from '@expo/vector-icons/MaterialIcons'
import { Dashboard } from '../screens/dashboard/dashboard'
import { Settings } from '../screens/settings/settings'
import { colors } from '../styles/theme'

const { Navigator, Screen } = createBottomTabNavigator()
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
                name='Dashboard'
                component={Dashboard}
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