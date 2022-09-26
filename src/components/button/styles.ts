import {
    TouchableOpacity,
    Text,
} from 'react-native'

import styled from 'styled-components/native'
import { colors } from '../../styles/theme'

export const Container = styled(TouchableOpacity)`
    width: 100%;
    margin-top: 10px;
    background-color: ${colors.secondary[500]};
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
`

export const Title = styled(Text)`
    color: ${colors.gray[400]};
    font-size: 16px;
`