import React from 'react'

import { TextInputProps } from 'react-native'

import { 
    Container,
    InputText,
    Label
} from './styles'

type InputProps = TextInputProps & {
    label: string
}

export const Input:React.FC<InputProps> = ({label,...rest}) => {
    return (
        <Container>
            <Label>{label}</Label>
            <InputText {...rest} />
        </Container>
    )
}