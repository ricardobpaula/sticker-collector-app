import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'

import styled from 'styled-components/native'
import { colors } from '../../styles/theme'

interface ItemProps {
    backgroundColor: string
}

export const Container = styled(View)`
    margin-top: 10px;
    align-items: center;
    width: 100%;
`

export const Header = styled(View)`
    width: 100%;
    padding: 0 20px;
    flex-direction: row;
    justify-content: space-between;
`

export const Title = styled(Text)`
    font-size: 16px;
    font-weight: bold;
    color: ${colors.secondary[500]};
`
export const SubTitle = styled(Text)`
    font-size: 15px;
    color: ${colors.gray[700]};
    text-align: center;
`

export const Content = styled(View)`
    width: 100%;
    background-color: ${colors.gray[500]};
    flex-direction: row;
    flex-wrap: wrap;
    flex-grow: 5;
    align-items: center;
    margin: 10px;
    padding: 5px 0px;
    border-radius: 25px;
`

export const Item = styled(TouchableOpacity)<ItemProps>`
    width: 50px;
    height: 50px;
    border-radius: 30px;
    margin: 10px; 
    align-items: center;
    justify-content: center;
    background-color: ${props => props.backgroundColor}
`

