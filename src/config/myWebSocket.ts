
const isDev = process.env.NODE_ENV === 'development'
export const myWebSocket = {
    url: isDev ? "ws://localhost:9091/api/webSocket/":"ws://线上地址/api/webSocket/"
}

