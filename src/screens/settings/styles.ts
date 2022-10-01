import { SafeAreaView, View, Text } from 'react-native'

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
    width: 100%;
`

export const Title = styled(Text)`
    font-size: 36px;
    color: ${colors.blue[500]};
`

export const Export = styled(View)`
    width: 100%;
`