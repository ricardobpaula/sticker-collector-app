import CheckBox from '@react-native-community/checkbox'
import { SafeAreaView, Text, View } from 'react-native'
import styled from 'styled-components'
import { colors } from '../../styles/theme'

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${colors.gray[700]};
`

export const Content = styled(View)`
    flex: 1;
    padding: 20px 20px;
    align-items: center;
`

export const Label = styled(Text)`
    font-size: 16px;
    color: ${colors.secondary[500]};
`

export const Row =styled(View)`
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`

export const Form = styled(View)`
    width: 100%;
    margin-bottom: 20px;
`

export const CustomCheckbox = styled(CheckBox)`
    height: 20px;
    width: 20px;
    border-radius: 20px;
`
