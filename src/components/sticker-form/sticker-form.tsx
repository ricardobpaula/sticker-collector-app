import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Alert, Dimensions } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { api } from '../../services/api'
import { Button } from '../button/button'
import CustomModal from '../custom-modal/custom-modal'
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
    openModal: () => void
}

interface StickerFormProps {
    sticker: Sticker
    ownerId: string
    onHandleSubmit: () => void
}

const StickerForm:React.ForwardRefRenderFunction<StickerFormHandles, StickerFormProps> = 
    ({ sticker, ownerId, onHandleSubmit }, ref) => {
    const modalizeRef = useRef<Modalize>(null)
    const [have, setHave] = useState<boolean>(sticker?.have ?? false)
    const [pasted, setPasted] = useState<boolean>(sticker?.pasted ?? false)
    const [obs, setObs] = useState<string>(sticker?.obs)

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
            modalizeRef.current?.close()
        } catch (error) {
            console.error(error)
            Alert.alert('Error loading stickers')
        }
    }

    const openModal = () => {
        modalizeRef.current?.open()
    }
    useImperativeHandle(ref, () => {
        return {
          openModal
        }
      })

    return (
            <CustomModal
                ref={modalizeRef}
                height={Dimensions.get('window').height * 0.6}
            >
            <Container>
                <Title>Figurinha {sticker?.number}</Title>
                <Form>
                    <Row>
                        <Label>Possui?</Label>
                        <CustomCheckbox 
                            value={have}
                            onChange={()=>setHave(item => !item)}
                        />
                    </Row>

                    <Row>
                        <Label>Colada?</Label>
                        <CustomCheckbox 
                            value={pasted}
                            onChange={()=>setPasted(item => !item)} 
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
        </CustomModal>
    )
}

export default forwardRef(StickerForm)
