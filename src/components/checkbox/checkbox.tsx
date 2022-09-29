import React, { useEffect, useState } from 'react'
import { Container } from './styles'

import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '../../styles/theme'

interface CheckBoxProps {
    value: boolean
    onChangeValue: (value: boolean) => void
}

export const CheckBox:React.FC<CheckBoxProps> = ({value, onChangeValue}) => {
    const [checked, setChecked] = useState<boolean>(value)
    
    const onSetValue = () => {
        const newValue = !checked
        setChecked(newValue)
        onChangeValue(newValue)
    }

    return (
        <Container
            activeOpacity={0.7}
            onPress={onSetValue}
        >
            {checked &&
                <MaterialIcons
                    name='check'
                    size={30}
                    color={colors.secondary[500]}
                />
            }
        </Container>
    )
}