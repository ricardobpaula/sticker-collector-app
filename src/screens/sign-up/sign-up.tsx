import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { useState } from "react"
import { Alert, TouchableOpacity } from "react-native"
import { Button } from "../../components/Button/button"
import { Input } from "../../components/Input/input"
import { useAuth } from "../../hooks/useAuth"
import { AuthStackParamsList } from "../../routes/auth.routes"
import { api } from "../../services/api"
import {
    Container,
    Content,
    Header,
    Title,
    Footer,
    Form,
    LoginButtonText
} from './styles'

type SignUpScreenProp = NativeStackNavigationProp<AuthStackParamsList, 'SignUp'>

export const SignUp:React.FC = () => {
    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const navigator = useNavigation<SignUpScreenProp>()

    const { login } = useAuth()

    const handleSubmit = async () => {
        if (!name) {
            return Alert.alert('Nome não preenchido')
        }
        if (!email) {
            return Alert.alert('E-mail não preenchido')
        }

        try {
            const { status } = await api.post<any>('/users', {
                name,
                email
            })

            if (status) {
                await login({email})
            }

        } catch (error) {
            Alert.alert(error.response.data.error)
        }
    }

    const handleLoginButton = () => {
        navigator.navigate('Login')
    }

    return (
        <Container>
            <Content>
                <Header>
                    <Title>Sejá bem vindo!</Title>
                </Header>
                <Form>
                    <Input 
                        label='Nome'
                        placeholder='Ex: João das Neves'
                        onChangeText={setName}
                        autoCapitalize='none'
                    />
                    <Input 
                        label='E-mail'
                        placeholder='Ex: joao.neves@email.com'
                        onChangeText={setEmail}
                        autoCapitalize='none'
                        keyboardType='email-address'
                    />

                    <Button
                        title='Começar'
                        onPress={handleSubmit}
                    />
                </Form>
                <Footer>
                    <TouchableOpacity onPress={handleLoginButton}>
                        <LoginButtonText>Já possui uma conta?</LoginButtonText>
                    </TouchableOpacity>
                </Footer>
                    
            </Content>
        </Container>
    )
}