import { SafeAreaView, View } from 'react-native'

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