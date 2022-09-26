import React from "react";

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
 }

export const SectionItem:React.FC<SectionItem> = ({
    section: { code, group, name, stickers }
}) => {
    return (
        <Container>
            <Header>
                <Title>{name}</Title>
            </Header>
            <Content>
                {
                    stickers.map(sticker => (
                        <Item key={sticker.id}>
                            <SubTitle>{sticker.number}</SubTitle>
                        </Item>
                    ))
                }
            </Content>
            
        </Container>
    )
}