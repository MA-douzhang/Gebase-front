
const isDev = process.env.NODE_ENV === 'development'
export const myWebSocket = {
    url: isDev ? "ws://localhost:9091/api/webSocket/":"ws://服务器地址/api/webSocket/"
}

