
const isDev = process.env.NODE_ENV === 'development'
export const myWebSocket = {
    url: isDev ? "ws://127.0.0.1:9090/api/webSocket/":"ws://8.130.16.185:9090/api/webSocket/"
}

