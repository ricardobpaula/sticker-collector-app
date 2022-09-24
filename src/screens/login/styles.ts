import {
    SafeAreaView,
    View,
    Text
} from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../styles/theme'

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${colors.gray[700]};
`

export const Content = styled(View)`
    flex: 1;
    padding: 20px 20px;
    align-items: center;
    justify-content: space-around;
`

export const Header = styled(View)`
    align-items: center;
    margin-top: 10px;
`

export const Title = styled(Text)`
    color: ${colors.secondary[500]};
    font-size: 25px;
`

export const Form = styled(View)`
    width: 100%;
    margin-top: 10px;
    align-items: center;
`
export const SignInButtonText = styled(Text)`
    margin-top: 10px;
    color: ${colors.gray[100]};
    font-size: 14px;
`
export const Footer = styled(View)`
    width: 100%;
    align-items: center;
    margin-top: 10px;
`
