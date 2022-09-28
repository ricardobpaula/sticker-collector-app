import React, { useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { colors } from "../../styles/theme";
import StickerForm, { StickerFormHandles }  from "../sticker-form/sticker-form"

import { 
    Container,
    Content,
    Header,
    Item,
    SubTitle,
    Title
 }from './styles'

 interface SectionItem {
    section: Section
    handleOpenSticker: (sticker: Sticker, sectionCode: string) => void
 }

export const SectionItem:React.FC<SectionItem> = ({
    section: { code, name, stickers }, handleOpenSticker
}) => {

    return (
        <Container>
            <Header>
                <Title>{name}</Title>
            </Header>
            <Content>
                {
                    stickers.map(sticker => {
                        const background = sticker.have && sticker.pasted ?
                            colors.green[500] :
                                sticker.have && !sticker.pasted ?
                                    colors.primary[300] :
                                    colors.gray[100]
                        return (
                            <Item 
                                key={sticker.id}
                                backgroundColor={background}
                                activeOpacity={0.7}
                                onPress={() => handleOpenSticker(sticker, code)}
                            >
                                <SubTitle>
                                    {code}{sticker.number}
                                </SubTitle>
                            </Item>
                        )
                    })
                }
            </Content>

        </Container>
    )
}