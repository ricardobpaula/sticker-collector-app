import React, { useEffect, useRef, useState } from 'react'
import { ProgressBar } from '../../components/progress-bar/progress-bar'
import { colors } from '../../styles/theme'

import { Loading } from '../../components/loading/loading'

import {
    Container,
    Content,
    ListSection
} from './styles'
import { Alert } from 'react-native'
import { api } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'
import { SectionItem } from '../../components/section-item/section-item'
import StickerForm, { StickerFormHandles } from '../../components/sticker-form/sticker-form'

export const Dashboard:React.FC = () => {
    const [sections, setSections] = useState<Section[]>([])
    const [loaging, setLoading] = useState<boolean>(true)
    const { userId } = useAuth()

    const modalRef = useRef<StickerFormHandles>(null)

    const handleOpenSticker = (sticker: Sticker, sectionCode: string) => {
        modalRef.current?.openModal(sticker, sectionCode)
    }

    const handleUpdateSticker = () => {
        setLoading(true)
        loadStickers()
    }

    const loadStickers = async () => {
        try {
            const { data: { sections } } = await api.get('/stickers', {
                headers: {
                    userId
                }
            })
            setSections(sections)
            setLoading(false)
        } catch (error) {
            console.error(error.message)
            Alert.alert('Error loading stickers')
            setLoading(false)
        }
    }

    useEffect(() => {
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
                            <SectionItem 
                                section={item}
                                key={item.id}
                                handleOpenSticker={(sticker, sectionCode) => handleOpenSticker(sticker, sectionCode)}
                            />
                            )
                    }}
                />
            </Content>
            <StickerForm
                ownerId={userId}
                ref={modalRef}
                onHandleSubmit={handleUpdateSticker}
            />
            
        </Container>
    )
}