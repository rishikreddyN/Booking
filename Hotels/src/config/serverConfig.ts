import dotenv from "dotenv"

function loadEnv() {
    dotenv.config()
}
loadEnv()
type serverConfig = {
    PORT:number
}

export const serverConfig: serverConfig = {
    PORT: Number(process.env.PORT) || 3000
}
