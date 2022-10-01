export declare global {
    
    interface User {
        userId: string
        name: string
    }
    interface Sticker {
        id: string
        number: number
        name: string
        obs: string
        have: boolean
        pasted: boolean
        repeated: number
    }
    
    interface Section {
        id: string
        name: string
        code: string
        group: string
        stickers: Sticker[]
    }
}