import {
    Platform,
    StatusBar
} from 'react-native'

import { createGlobalStyle } from 'styled-components'

const paddingTop = StatusBar.currentHeight ? StatusBar.currentHeight : 20

export const GlobalStyle = createGlobalStyle`
    * {
        padding-top: ${Platform.OS === 'android' ? paddingTop : 0}
    }
`
