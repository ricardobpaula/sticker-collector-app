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
import { useNavigation } from "@react-navigation/native"

export const Login:React.FC = () => {
    const [email, setEmail] = useState<string>()

    const navigator = useNavigation()

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

    const handleSignUpButton = () => {
        navigator.goBack()
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
                    <TouchableOpacity onPress={handleSignUpButton}>
                        <SignInButtonText>Não possui uma conta?</SignInButtonText>
                    </TouchableOpacity>
                </Footer>
                    
            </Content>
        </Container>
    )
}