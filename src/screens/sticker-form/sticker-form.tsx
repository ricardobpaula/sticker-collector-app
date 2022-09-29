import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native';
import { Button } from '../../components/button/button';
import { Input } from '../../components/Input/input';
import { useAuth } from '../../hooks/useAuth';
import { DashboardStackParamsList } from '../../routes/app.routes';
import { api } from '../../services/api';

import {
    Container,
    Content,
    CustomCheckbox,
    Form,
    Label,
    Row
} from './styles'

type StickerScreenRouteProp = RouteProp<DashboardStackParamsList, 'StickerForm'>
type StickerScreenProp = NativeStackNavigationProp<DashboardStackParamsList, 'StickerForm'>

export const StickerForm:React.FC = () => {
    const [sticker, setSticker] = useState<Sticker>()
    const [sectionCode, setSectionCode] = useState<string>()

    const [have, setHave] = useState<boolean>(false)
    const [pasted, setPasted] = useState<boolean>(false)
    const [obs, setObs] = useState<string>('')

    const { userId } = useAuth()
    const route = useRoute<StickerScreenRouteProp>()
    const navigation = useNavigation<StickerScreenProp>()

    const handleSubmit = async () => {
        try {
            await api.put(`/stickers/${sticker.id}`,{
                have,
                pasted,
                obs
            },{
                headers: {
                    userId
                }
            }
            )
            navigation.goBack()
        } catch (error) {
            console.error(error)
            Alert.alert('Error loading stickers')
        }
    }

    useEffect(() => {
        const { sticker, sectionCode } = route.params

        setSticker(sticker)
        setSectionCode(sectionCode)
        setHave(sticker?.have ?? false)
        setPasted(sticker?.pasted ?? false)
        setObs(sticker?.obs)

        navigation.setOptions({title: `Figurinha ${sectionCode}${sticker.number}`})
    },[])


    return (
        <Container>
            <Content>
                <Form>
                    <Row>
                        <Label>Possui?</Label>
                        {/* <CustomCheckbox 
                            value={have}
                            onValueChange={(newValue)=>setHave(newValue)}
                        /> */}
                    </Row>
                    <Row>
                        <Label>Colada?</Label>
                        {/* <CustomCheckbox 
                            value={pasted}
                            onValueChange={(newValue)=>setPasted(newValue)}
                        /> */}
                    </Row>
                    <Input
                        label='Observação' 
                        multiline
                        numberOfLines={5}
                        value={obs}
                        onChangeText={setObs}
                    />
                </Form>
                <Button title='Salvar' onPress={handleSubmit} />
            </Content>
        </Container>
    )
}

