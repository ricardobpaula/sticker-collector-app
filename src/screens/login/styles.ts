import styled from 'styled-components/native'
import { colors } from '../../styles/theme'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${colors.gray[700]};
`

export const Title = styled.Text`
    color: ${colors.gray[100]}
`