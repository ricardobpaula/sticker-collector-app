import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://sticker-collector.fly.dev'
    // baseURL: 'http://localhost:3000'
})
