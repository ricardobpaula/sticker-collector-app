import React from 'react'

import { TouchableOpacityProps } from 'react-native'

import {
    Container,
    Title
} from './styles'

import { colors } from '../../styles/theme'


type SectionItemProps = TouchableOpacityProps & {
    sticker: Sticker
    sectionCode: string
}

export const SectionItem:React.FC <SectionItemProps> = (
    {sticker, sectionCode, ...rest}) => {
    
    const background = sticker.have && sticker.pasted ?
        colors.green[500] :
            sticker.have && !sticker.pasted ?
                colors.orange[300] :
                colors.gray[100]

    return (
        <Container 
            backgroundColor={background}
            {...rest}
        >
            <Title>
                {sectionCode}{sticker.number}
            </Title>
        </Container>
    )
}