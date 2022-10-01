import React, { useState } from 'react'

import { MaterialIcons } from '@expo/vector-icons'

import { colors } from '../../styles/theme'

import {
    Container,
    Label,
    Content,
    CheckBox
} from './styles'

type RadioItemProps = {
    label: string
    value: number
}

type RadioProps = {
    data: RadioItemProps[]
    selected: number
    onChangeValue: (value: number) => void
}

export const RadioButton:React.FC<RadioProps> = ({
    data,
    selected,
    onChangeValue
}) => { 

    const changeValue = (value: number) => {
        onChangeValue(value)
    }

    return (
        <Container>
            { data.map(item => (
                <Content
                    activeOpacity={0.7}
                    key={item.value}
                    onPress={() => changeValue(item.value)}
                >
                    <Label>{item.label}</Label>
                    <CheckBox>
                        {selected === item.value &&
                            <MaterialIcons
                                name='check'
                                size={30}
                                color={colors.blue[500]}
                            />
                        }
                    </CheckBox>
                </Content>
            ))
            }
        </Container>
    )
}