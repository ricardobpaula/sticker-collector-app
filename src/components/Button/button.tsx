import React from 'react'

import { TouchableOpacityProps } from 'react-native'

import {
    Container,
    Title
} from './styles'

type ButtonProps = TouchableOpacityProps & {
    title: string
}
export const Button:React.FC<ButtonProps> = ({title,...rest}) => {
    return (
        <Container{...rest}>
            <Title>{title}</Title>
        </Container>
    )
}