import React from 'react'
import {
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native'
import { 
    Container, 
    Title,
    ProgressBarContainer,
    ProgressBarContent
} from './styles'

type ProgressBarProps = TouchableOpacityProps & {
    title: string
    progress: number
    progressColor: string
    size: number
}

export const ProgressBar:React.FC<ProgressBarProps> = ({
    title,
    progress,
    progressColor,
    size,
    ...rest
}) => {

    const percent = Number(((progress * 100) / size).toFixed(2))

    return (
        <Container>
            <TouchableOpacity
                activeOpacity={0.7}
                {...rest}
            >
                <Title
                    color={progressColor}
                >
                    {title}: {progress} ({percent}%)
                </Title>
            </TouchableOpacity>
            <ProgressBarContainer>
                <ProgressBarContent
                    color={progressColor}
                    percent={percent}
                />
            </ProgressBarContainer>
        </Container>
    )
}