import React, { useState } from "react"

import { Alert, TouchableOpacity } from 'react-native'

import { useNavigation } from "@react-navigation/native"

import { useAuth } from "../../hooks/useAuth"

import { Button } from "../../components/button/button"
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

import { AuthStackParamsList } from "../../routes/auth.routes"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

type LoginScreenProp = NativeStackNavigationProp<AuthStackParamsList, 'Login'>

export const Login:React.FC = () => {
    const [email, setEmail] = useState<string>()

    const { login } = useAuth()

    const navigator = useNavigation<LoginScreenProp>()

    const handleSubmit = async () => {
        if(!email) {
            return Alert.alert('Preencha o formulario corretamente')
        }

        await login({email})
    }

    const handleSignUpButton = () => {
        navigator.navigate('SignUp')
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