export declare global {
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