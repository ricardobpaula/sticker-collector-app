import React, {
    createContext,
    useEffect,
    useState,
} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { api } from '../services/api'
import { Alert } from 'react-native'
import { getAuthStorage, setAuthStorage } from '../utils/storage'

interface RequestProps {
    email: string
}

interface AuthContextProps {
    loading: boolean
    signed: boolean
    userId: string
    login(request: RequestProps): Promise<void>
    logout(): void
}


type AuthProviderProps = {
    children: React.ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {
    const [userId, setUserId] = useState<string>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function loadStorage() {
            const { userId } = await getAuthStorage()
            setUserId(userId && undefined)
            setLoading(false)
        }
        loadStorage()
    },[])

    async function login ({ email }: RequestProps) {
        try {
            const { data: { userId } } = await api.post<any>('/users/auth', {
                email
            })
            setUserId(userId)
            await setAuthStorage({userId})
        } catch (error) {
            Alert.alert(error.response.data.error)
        }
    }

    function logout() {
        AsyncStorage.clear()
        setUserId(undefined)
    }
    
    return (
        <AuthContext.Provider
            value={{
                loading,
                signed: !!userId,
                userId,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

