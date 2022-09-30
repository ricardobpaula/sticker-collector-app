import React, { useState } from 'react'
import { Alert } from 'react-native'

import * as Clipboard from 'expo-clipboard'

import { Button } from '../../components/button/button'
import { Loading } from '../../components/loading/loading'
import { useAuth } from '../../hooks/useAuth'
import { api } from '../../services/api'

import {
    Container,
    Content,
    Export
} from './styles'

export const Settings:React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    
    const { userId, logout } = useAuth()

    const loadStickers = async () => {
        setLoading(true)
        try {
            const { data: { sections } } = await api.get(`/stickers?have=false`, {
                headers: {
                    userId
                }
            })
            copyToClipboard(sections)
        } catch (error) {
            Alert.alert('Error loading stickers')
            setLoading(false)
        }
    }

    const copyToClipboard = async (sections: Section[]) => {
        const text = sections.reduce((acc, section, index, arr) => {
            const title = `${section.name}`
            const stickers = section.stickers.reduce((value, sticker,index, arr) =>{
                return value + 
                    `${section.code}${sticker.number}${index === arr.length -1 ? '' : ', '}`
            }, '')
            return `${acc}\n${title}\n${stickers}${index < arr.length -1 ? '\n' : ''}`
        }, '')
        await Clipboard.setStringAsync(text)
        Alert.alert('Suas figurinhas faltantes foram copiadas para área de transferencia')
        setLoading(false)
    }

    const handleExportSticker = () => {
        loadStickers()
    }

    if(loading) return <Loading />

    return (
        <Container>
            <Content>
                <Export>
                    <Button onPress={handleExportSticker} title='Exportar Faltantes'/>
                </Export>
                <Button onPress={() => logout()} title='Sair'/>
            </Content>
        </Container>
    )
}