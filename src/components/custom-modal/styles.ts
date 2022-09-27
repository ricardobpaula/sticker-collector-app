import {
    Animated,
    TouchableOpacity,
    View
} from 'react-native'

import styled from 'styled-components/native'

interface ContentProps {
    height: Animated.Value
}

export const Container = styled(View)`
    flex: 1;
    justify-content: flex-end;
`
export const DismissArea = styled(TouchableOpacity)`
    flex: 1;
`
export const Content = styled(Animated.View)<ContentProps>`
`
