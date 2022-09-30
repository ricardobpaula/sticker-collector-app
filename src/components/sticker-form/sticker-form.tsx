import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Alert, Animated, Modal, ModalProps } from 'react-native'
import { api } from '../../services/api'
import { Button } from '../button/button'
import { CheckBox } from '../checkbox/checkbox'
import { Input } from '../Input/input'
import { NumberSelector } from '../number-selector/number-selector'
import { 
    Container, 
    Row,
    Form,
    Label,
    Title,
    DismissArea
} from './styles'

export interface StickerFormHandles {
    openModal: (sticker: Sticker, sectionCode: string) => void
}

type StickerFormProps = ModalProps &  {
    ownerId: string
    onHandleSubmit: () => void
}

const StickerForm:React.ForwardRefRenderFunction<StickerFormHandles, StickerFormProps> = 
    ({  ownerId, onHandleSubmit, ...rest }, ref) => {
    const [animatedHeight] = useState(new Animated.Value(0))

    const [visible, setVisible] = useState<boolean>(false)
    const [sticker, setSticker] = useState<Sticker>()
    const [sectionCode, setSectionCode] = useState<string>()
    const [have, setHave] = useState<boolean>(false)
    const [pasted, setPasted] = useState<boolean>(false)
    const [obs, setObs] = useState<string>('')
    const [repeated, setRepeated] = useState<number>()

    const handleSubmit = async () => {
        try {
            await api.put(`/stickers/${sticker.id}`,{
                have,
                pasted,
                obs,
                repeated
            },{
                headers: {
                    userId: ownerId
                }
            }
            )
            onHandleSubmit()
        } catch (error) {
            Alert.alert('Error loading stickers')
        }
    }

    const onOpenAnimate = Animated.timing(animatedHeight, {
    useNativeDriver: false,
    toValue: 0,
    duration: 250
    })

    const onCloseAnimate = Animated.timing(animatedHeight, {
    useNativeDriver: false,
    toValue: 0,
    duration: 250
    })

    const openModal = (sticker: Sticker, sectionCode: string) => {
        setVisible(true)
        onOpenAnimate.start()
        setSticker(sticker)
        setSectionCode(sectionCode)
        setHave(sticker.have)
        setPasted(sticker.pasted)
        setObs(sticker.obs)
        setRepeated(sticker.repeated)
    }

    const close = () => {
        onCloseAnimate.start(() => setVisible(false))
    }

    useImperativeHandle(ref, () => {
        return {
            openModal
        }
        })

    return (
            <Modal
                animationType='fade'
                visible={visible}
                transparent
                {...rest}
            >

            <DismissArea
              onPress={close}
            />

            <Container>
                <Title>Figurinha {sectionCode}{sticker?.number}</Title>
                <Form>
                    <Row>
                        <Label>Possui?</Label>
                        <CheckBox
                            onChangeValue={setHave}
                            value={have}
                        />
                    </Row>
                    <Row>
                        <Label>Colada?</Label>
                        <CheckBox
                            onChangeValue={(value) => setPasted(value)}
                            value={pasted}
                            disabled={!have}
                        />
                    </Row>
        
                    <Input 
                        label='Observação' 
                        multiline
                        numberOfLines={5}
                        value={obs}
                        onChangeText={setObs}
                    />

                    <NumberSelector
                        title='Repetidas'
                        value={repeated}
                        disabled={!have}
                        onChangeValue={setRepeated}
                    />
                </Form>
                <Button title='Salvar' onPress={handleSubmit} />
            </Container>
        </Modal>
    )
}

export default forwardRef(StickerForm)
