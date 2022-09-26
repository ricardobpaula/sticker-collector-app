import React, { useEffect, useState } from 'react'
import { ProgressBar } from '../../components/progress-bar/progress-bar'
import { colors } from '../../styles/theme'

import { Loading } from '../../components/loading/loading'

import {
    Container,
    Content,
    ListSection
} from './styles'
import { Alert, FlatList, Text } from 'react-native'
import { api } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'
import { SectionItem } from '../../components/section-item/section-item'

export const Dashboard:React.FC = () => {
    const [sections, setSections] = useState<Section[]>([])
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

    const progress = sections.reduce((acc, section) => {
        const pro = section.stickers.reduce((sum, sticker) => {
            return sticker.have ? sum + 1 : sum 
        },0)
        return pro + acc
    },0)
    
    return (
        <Container>
            <Content>
                <ProgressBar  
                    title='Concluído'
                    progress={progress}
                    size={678}
                    progressColor={colors.secondary[500]}
                />

                <ListSection
                    data={sections}
                    renderItem={({item}) => {
                        return (
                            <SectionItem section={item}/>
                            )
                    }}
                />
            </Content>
        </Container>
    )
}