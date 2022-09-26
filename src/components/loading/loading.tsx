import React from 'react'

import LottieView from 'lottie-react-native'

import LoadingAnimation from '../../assets/loading-animation.json'

import {
    Container
} from './styles'

export const Loading:React.FC = () => {
    return (
        <Container>
            <LottieView 
                loop
                autoPlay
                source={LoadingAnimation} 
                style={{ width: '20%' }}
            />
        </Container>
    )
}