import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthStorageProps {
    userId: string
}

export async function getAuthStorage():Promise<AuthStorageProps|undefined> {
    const userId = await AsyncStorage.getItem('@StickerCollector-APP:userId')

    if (!userId){
        return undefined
    }

    return { userId }
}

export async function setAuthStorage({ userId } :AuthStorageProps):Promise<void> {
    await AsyncStorage.setItem('@StickerCollector-APP:userId', userId)
}