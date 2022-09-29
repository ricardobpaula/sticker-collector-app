import {
    View,
    Text
} from 'react-native'

import styled from 'styled-components/native'
import { colors } from '../../styles/theme'

interface TitleProps {
    color: string
}

interface ProgressBarProps {
    color: string
    percent: number
}

export const Container = styled(View)`
    align-items: center;
    width: 100%;
`

export const Title = styled(Text)<TitleProps>`
    font-size: 16px;
    font-weight: bold;
    color: ${props => props.color};
`

export const ProgressBarContainer = styled(View)`
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 20px;
    border-radius: 15px;
    background-color: ${colors.gray[100]};
`

export const ProgressBarContent = styled(View)<ProgressBarProps>`
    width: ${props => props.percent}%;
    height: 20px;
    border-radius: 15px;
    background-color: ${props => props.color};
`
