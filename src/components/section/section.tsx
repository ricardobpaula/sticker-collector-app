import React from "react"
import { SectionItem } from "../section-item/section-item"

import { 
    Container,
    Content,
    Header,
    Title
 }from './styles'

 interface SectionItem {
    section: Section
    handleOpenSticker: (sticker: Sticker, sectionCode: string) => void
 }

export const Section:React.FC<SectionItem> = ({
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
                        return (
                            <SectionItem
                                key={sticker.id}
                                sticker={sticker}
                                sectionCode={code}
                                activeOpacity={0.7}
                                onPress={() => handleOpenSticker(sticker, code)}
                            />
                        )
                    })
                }
            </Content>

        </Container>
    )
}