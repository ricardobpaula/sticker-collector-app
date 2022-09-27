import React, { forwardRef, useImperativeHandle, useState } from 'react'
import {
  Modal,
  Animated,
  Dimensions,
  ModalProps
} from 'react-native'
import { Container, Content, DismissArea } from './styles';


export interface CustomModalHandles {
  open: () => void;
  close: () => void;
}

type CustomModalProps = ModalProps & {
  height?: number
  Header?: React.ReactNode
  children?: React.ReactNode
}

const CustomModal:React.ForwardRefRenderFunction<CustomModalHandles, CustomModalProps> = ({
  height = Dimensions.get('screen').height * 0.2,
  Header,
  children,
  ...rest
}, ref) => {
  const [visible, setVisible] = useState(false)
  const [animatedHeight] = useState(new Animated.Value(0))

  function open () {
    setVisible(true)
    onOpenAnimate.start()
  }

  function close () {
    onCloseAnimate.start(() => setVisible(false))
  }

  const onOpenAnimate = Animated.timing(animatedHeight, {
    useNativeDriver: false,
    toValue: height + 0,
    duration: 250
  })

  const onCloseAnimate = Animated.timing(animatedHeight, {
    useNativeDriver: false,
    toValue: 0,
    duration: 250
  })

  useImperativeHandle(ref, () => {
    return {
      open,
      close
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
        <DismissArea
            onPress={close}
        />
            <Content height={animatedHeight}>
            {Header}
            {children}
            </Content>
        </Container>
    </Modal>
  )
}

export default forwardRef(CustomModal)