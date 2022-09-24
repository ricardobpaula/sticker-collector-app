import { 
    View, 
    Text,
    TextInput
} from 'react-native'
import styled from "styled-components/native"
import { colors } from '../../styles/theme'

export const Container = styled(View)`
    width: 100%;
`

export const Label = styled(Text)`
    font-size: 12px;
    color: ${colors.gray[200]};
`
export const InputText = styled(TextInput)`
    font-size: 16px;
    width: 100%;
    margin-top: 5px;
    margin-bottom: 10px;
    background-color: ${colors.gray[100]};
    color: ${colors.gray[700]};
    padding: 0 24px;
    height: 40px;
    border-radius: 10px;
`