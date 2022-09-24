import React, { useState } from "react"

import { Alert, TouchableOpacity } from 'react-native'

import { api } from '../../services/api'

import { Button } from "../../components/Button/button"
import { Input } from "../../components/Input/input"
import { 
    Container,
    Content,
    Header,
    Title,
    Form,
    Footer,
    SignInButtonText
} from './styles'

export const Login:React.FC = () => {
    const [email, setEmail] = useState<string>()

    const handleSubmit = async () => {
        if(!email) {
            return Alert.alert('Preencha o formulario corretamente')
        }

        try {
            const { data } = await api.post<any>('/users/auth', {
                email
            })

        } catch (error) {
            Alert.alert(error.response.data.error)
        }
        
    }

    return (
        <Container>
            <Content>
                <Header>
                    <Title>Bem vindo de volta!</Title>
                </Header>
                <Form>
                    <Input 
                        label='E-mail'
                        placeholder='Ex: joao.neves@email.com'
                        onChangeText={setEmail}
                        autoCapitalize='none'
                        keyboardType='email-address'
                    />

                    <Button 
                        title='Entrar'
                        onPress={handleSubmit}
                    />
                </Form>
                <Footer>
                    <TouchableOpacity>
                        <SignInButtonText>Não possuo cadastro</SignInButtonText>
                    </TouchableOpacity>
                </Footer>
                    
            </Content>
        </Container>
    )
}