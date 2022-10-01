import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthStorageProps {
    user: User
}

export async function getAuthStorage():Promise<AuthStorageProps|undefined> {
    const userStorage = await AsyncStorage.getItem('@StickerCollector-APP:user')

    if (!userStorage){
        return undefined
    }

    const user = JSON.parse(userStorage)

    return { user }
}

export async function setAuthStorage({ user } :AuthStorageProps):Promise<void> {
    await AsyncStorage.setItem('@StickerCollector-APP:user', JSON.stringify(user))
}