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
    user: User
    login(request: RequestProps): Promise<void>
    logout(): void
}


type AuthProviderProps = {
    children: React.ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function loadStorage() {
            const response = await getAuthStorage()
            setUser(response ? response.user : undefined)
            api.defaults.headers['user-id'] = response ? response.user.userId : undefined
            setLoading(false)
        }
        loadStorage()
    },[])

    async function login ({ email }: RequestProps) {
        try {
            const { data } = await api.post<User>('/users/auth', {
                email
            })
            api.defaults.headers['user-id'] = data.userId
            setUser(data)
            await setAuthStorage({ user: data})
        } catch (error) {
            Alert.alert(error.response.data.error)
        }
    }

    function logout() {
        AsyncStorage.clear()
        setUser(undefined)
    }
    
    return (
        <AuthContext.Provider
            value={{
                loading,
                signed: !!user,
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

