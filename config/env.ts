import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })
export const config = {
    port: process.env.PORT || 8000,
    url: process.env.DATABASE_URL,
    secret_access_token: process.env.SECRET_ACCESS_TOKEN,
    secret_refresh_token: process.env.SECRET_REFRESH_TOKEN
}