import React from 'react'
import { Button } from '../../components/Button/button'
import { useAuth } from '../../hooks/useAuth'

import {
    Container,
    Content
} from './styles'

export const Dashboard:React.FC = () => {
    const { logout } = useAuth()
    return (
        <Container>
            <Content>
                <Button onPress={() => logout()} title='Logout'/>
            </Content>
        </Container>
    )
}