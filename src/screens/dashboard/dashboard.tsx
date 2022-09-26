import React, { useEffect, useState } from 'react'
import { ProgressBar } from '../../components/progress-bar/progress-bar'
import { colors } from '../../styles/theme'

import { Loading } from '../../components/loading/loading'

import {
    Container,
    Content
} from './styles'
import { Alert, FlatList, Text } from 'react-native'
import { api } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'

export const Dashboard:React.FC = () => {
    const [sections, setSections] = useState<Section[]>()
    const [loaging, setLoading] = useState<boolean>(false)
    const { userId } = useAuth()
    

    useEffect(() => {
        async function loadStickers() {
            try {
                const { data: { sections } } = await api.get('/stickers', {
                    headers: {
                        userId
                    }
                })
                setSections(sections)
            } catch (error) {
                console.error(error.message)
                Alert.alert('Error loading stickers')
            }
        }

        loadStickers()
    }, [])

    if (loaging) return <Loading />

    console.log(sections?.length)
    return (
        <Container>
            <Content>
                <ProgressBar  
                    title='Concluído'
                    progress={0}
                    size={678}
                    progressColor={colors.secondary[500]}
                />

                <FlatList
                    data={sections}
                    renderItem={({ item }) => (
                        <Text>{item.name}</Text>
                    )}
                />
            </Content>
        </Container>
    )
}