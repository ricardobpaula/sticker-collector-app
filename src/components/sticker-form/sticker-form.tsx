import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Alert, Dimensions, Platform } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { api } from '../../services/api'
import { colors } from '../../styles/theme'
import { Button } from '../button/button'
import CustomModal, { CustomModalHandles } from '../custom-modal/custom-modal'
import { Input } from '../Input/input'
import { 
    Container, 
    Row,
    Form,
    CustomCheckbox,
    Label,
    Title
} from './styles'

export interface StickerFormHandles {
    openModal: (sticker: Sticker, sectionCode: string) => void
}

interface StickerFormProps {
    ownerId: string
    onHandleSubmit: () => void
}

const StickerForm:React.ForwardRefRenderFunction<StickerFormHandles, StickerFormProps> = 
    ({  ownerId, onHandleSubmit }, ref) => {
    const modalRef = useRef<Modalize>(null)

    const [sticker, setSticker] = useState<Sticker>()
    const [sectionCode, setSectionCode] = useState<string>()
    const [have, setHave] = useState<boolean>(false)
    const [pasted, setPasted] = useState<boolean>(false)
    const [obs, setObs] = useState<string>('')

    const handleSubmit = async () => {
        try {
            await api.put(`/stickers/${sticker.id}`,{
                have,
                pasted,
                obs
            },{
                headers: {
                    userId: ownerId
                }
            }
            )
            onHandleSubmit()
            modalRef.current?.close()
        } catch (error) {
            console.error(error)
            Alert.alert('Error loading stickers')
        }
    }

    const openModal = (sticker: Sticker, sectionCode: string) => {
        setSticker(sticker)
        setSectionCode(sectionCode)
        setHave(sticker.have)
        setPasted(sticker.pasted)
        setObs(sticker.obs)
        modalRef.current?.open()
    }
    useImperativeHandle(ref, () => {
        return {
          openModal
        }
      })

    return (
            <Modalize
                ref={modalRef}
                modalHeight={Dimensions.get('window').height * 0.4}
                modalStyle={{flex: 1, backgroundColor: colors.gray[700]}}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}
                keyboardAvoidingBehavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardAvoidingOffset={Platform.OS === 'ios' ? 64 : 0}
            >
            <Container>
                <Title>Figurinha {sectionCode}{sticker?.number}</Title>
                <Form>
                    <Row>
                        <Label>Possui?</Label>
                        <CustomCheckbox 
                            value={have}
                            onValueChange={(newValue)=>setHave(newValue)}
                        />
                    </Row>

                    <Row>
                        <Label>Colada?</Label>
                        <CustomCheckbox 
                            value={pasted}
                            onValueChange={(newValue)=>setPasted(newValue)}
                        />
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
            </Container>
        </Modalize>
    )
}

export default forwardRef(StickerForm)
