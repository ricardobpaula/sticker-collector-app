import React from 'react'
import { 
    Container, 
    Title,
    ProgressBarContainer,
    ProgressBarContent
} from './styles'

interface ProgressBarProps {
    title: string
    progress: number
    progressColor: string
    size: number
}

export const ProgressBar:React.FC<ProgressBarProps> = ({
    title,
    progress,
    progressColor,
    size
}) => {

    const percent = Number(((progress * 100) / size).toFixed(2))

    return (
        <Container>
            <Title>{title}: {percent}%</Title>
            <ProgressBarContainer>
                <ProgressBarContent
                    color={progressColor}
                    percent={percent}
                />
            </ProgressBarContainer>
        </Container>
    )
}