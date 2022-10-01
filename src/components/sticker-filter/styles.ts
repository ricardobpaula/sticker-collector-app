import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'

import styled from 'styled-components/native'

import { colors } from '../../styles/theme'

export const Container = styled(View)`
    background-color: ${colors.gray[700]};
    align-items: center;
    padding: 20px 40px;
    justify-content: flex-start;
    margin-top: 60px;
`

export const Title = styled(Text)`
    font-size: 16px;
    font-weight: bold;
    color: ${colors.blue[500]};
    margin-bottom: 20px;
`

export const DismissArea = styled(TouchableOpacity)`
    flex: 1;
`