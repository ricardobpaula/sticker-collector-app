import React from 'react'
import { Button } from '../../components/button/button'
import { useAuth } from '../../hooks/useAuth'

import {
    Container,
    Content
} from './styles'

export const Settings:React.FC = () => {
    const { logout } = useAuth()
    return (
        <Container>
            <Content>
                <Button onPress={() => logout()} title='Logout'/>
            </Content>
        </Container>
    )
}