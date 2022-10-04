import {
    TouchableOpacity,
    Text
} from 'react-native'

import styled from 'styled-components/native'
import { colors } from '../../styles/theme'

interface ItemProps {
    backgroundColor: string
}

export const Container = styled(TouchableOpacity)<ItemProps>`
    width: 50px;
    height: 50px;
    border-radius: 30px;
    margin: 10px; 
    align-items: center;
    justify-content: center;
    background-color: ${props => props.backgroundColor}
`

export const Title = styled(Text)`
    font-size: 15px;
    color: ${colors.gray[700]};
    text-align: center;
`