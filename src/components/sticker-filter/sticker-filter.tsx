import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Animated, Modal, ModalProps } from 'react-native'
import { Button } from '../button/button'
import { RadioButton } from '../radio-button/radio-button'

import {
    Container, DismissArea, Title
} from './styles'

export interface StickerFilterHandles {
    openModal: () => void
}

type StickerFilterProps = ModalProps & {
    onHandleSubmit: (value: number) => void
    value: number
}

const StickerFilter:React.ForwardRefRenderFunction<StickerFilterHandles, StickerFilterProps> = (
    {onHandleSubmit, value, ...rest}, ref) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [animatedHeight] = useState(new Animated.Value(0))
    const [selected, setSelected] = useState<number>(value)

    const radioButton = [
        { label: 'Todas', value: 1 },
        { label: 'Possuidas', value: 2 },
        { label: 'Coladas', value: 3 },
        { label: 'Faltantes', value: 4 },
        { label: 'Repetidas', value: 5 }
    ]

    const onChangeValue = (value: number) => {
        setSelected(value)
    }

    const onSubmit = () => {
        onHandleSubmit(selected)
        close()
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

        const close = () => {
            onCloseAnimate.start(() => setVisible(false))
        }

        const openModal = () => {
            setVisible(true)
            onOpenAnimate.start()
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
            <Container>
                <Title>Filtro de figurinhas:</Title>
                <RadioButton
                    data={radioButton}
                    selected={selected}
                    onChangeValue={onChangeValue}
                />
                <Button
                    onPress={onSubmit}
                    title='Filtrar'
                />
            </Container>
            <DismissArea
              onPress={close}
            />

        </Modal>
    )
}

export default forwardRef(StickerFilter)