import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'

import styled from "styled-components/native"
import { colors } from '../../styles/theme'

export const Container = styled(View)`
    width: 100%;
    background-color: ${colors.gray[700]};
`

export const Content = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
`

export const Label = styled(Text)`
    font-size: 16px;
    color: ${colors.blue[500]};
`

export const CheckBox = styled(View)`
    background-color: ${colors.gray[500]};
    height: 40px;
    width: 40px;
    border-radius: 25px;
    justify-content: center;
    align-items: center;
`

