import React, { useEffect, useRef, useState } from 'react'
import { ProgressBar } from '../../components/progress-bar/progress-bar'
import { colors } from '../../styles/theme'

import { Loading } from '../../components/loading/loading'

import {
    Container,
    Content,
    ListSection
} from './styles'

import { Alert, RefreshControl } from 'react-native'
import { api } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'
import { SectionItem } from '../../components/section-item/section-item'
import StickerForm, { StickerFormHandles } from '../../components/sticker-form/sticker-form'
import StickerFilter, { StickerFilterHandles } from '../../components/sticker-filter/sticker-filter'

export const Dashboard:React.FC = () => {
    const [sections, setSections] = useState<Section[]>([])
    const [loaging, setLoading] = useState<boolean>(true)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [filterSelected, setFilterSelected] = useState<number>(1)
    const [progressColor, setProgressColor] = useState<string>(colors.blue[500])
    const [progressText, setProgressText] = useState<string>('Concluído')

    const { user } = useAuth()

    const modalRef = useRef<StickerFormHandles>()
    const modalFilterRef = useRef<StickerFilterHandles>()

    const handleOpenSticker = (sticker: Sticker, sectionCode: string) => {
        modalRef.current?.openModal(sticker, sectionCode)
    }

    const handleUpdateSticker = () => {
        setLoading(true)
        setFilterSelected(1)
        setProgressColor(colors.blue[500])
        setProgressText('Concluído')
        loadStickers()
    }

    const handleRefresh = () => {
        setRefreshing(true)
        setLoading(true)
        loadStickers()
    }

    const handleChangeFilter = () => {
        modalFilterRef.current?.openModal()
    }

    const handleOnChangeFilter = (value: number) => {        
        let filter = ''

        switch (value) {
            case 1:
                filter = ''
                setProgressText('Concluído')
                setProgressColor(colors.blue[500])
                break
            case 2:
                filter = '?have=true'
                setProgressText('Possuidas')
                setProgressColor(colors.blue[500])
                break
            case 3:
                filter = '?have=true&pasted=true'
                setProgressText('Coladas')
                setProgressColor(colors.green[500])
                break
            case 4:
                filter = '?have=true&pasted=false'
                setProgressText('Para colar')
                setProgressColor(colors.orange[500])
                break
            case 5:
                filter = '?have=false&pasted=false'
                setProgressText('Faltantes')
                setProgressColor(colors.red[500])
                break
            case 6:
                filter = '?repeated=true'
                setProgressText('Repetidas')
                setProgressColor(colors.green[500])
                break
        }
        setFilterSelected(value)
        setLoading(true)
        loadStickers(filter)
    }

    const loadStickers = async (filter: string = '') => {
        try {
            const { data: { sections } } = await api.get(`/stickers${filter}`)
            setSections(sections)
            setLoading(false)
            setRefreshing(false)
        } catch (error) {
            Alert.alert('Error loading stickers')
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        loadStickers()
    }, [])

    if (loaging) return <Loading />

    const progress = sections.reduce((acc, section) => {
        const pro = section.stickers.reduce((sum, sticker) => {
            switch (filterSelected){
                case 1:
                    return sticker.have ? sum + 1 : sum
                case 6:
                    return sum + sticker.repeated
                default:
                    return sum + 1
            }
        },0)
        return pro + acc
    },0)

    
    
    return (
        <Container>
            <Content>
                <ProgressBar  
                    title={progressText}
                    progress={progress}
                    size={678}
                    progressColor={progressColor}
                    onPress={handleChangeFilter}
                />
                <ListSection
                    data={sections}
                    initialNumToRender={5}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        return (
                            <SectionItem 
                                section={item}
                                key={item.id}
                                handleOpenSticker={(sticker, sectionCode) => handleOpenSticker(sticker, sectionCode)}
                            />
                            )
                    }}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            tintColor={colors.blue[500]}
                        />
                    }
                />
                
            </Content>
            <StickerForm
                ownerId={user.userId}
                ref={modalRef}
                onHandleSubmit={handleUpdateSticker}
            />
            <StickerFilter
                ref={modalFilterRef}
                value={filterSelected}
                onHandleSubmit={(value) =>handleOnChangeFilter(value)}
            />
        </Container>
    )
}