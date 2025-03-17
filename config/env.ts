import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })
export const config = {
    port: process.env.PORT || 8000,
    url: process.env.DATABASE_URL,
    secret_access_token: process.env.SECRET_ACCESS_TOKEN,
    secret_refresh_token: process.env.SECRET_REFRESH_TOKEN,
    access_token_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    jwt_algorithm: process.env.JWT_ALGORITHM,
    cors_origin_domain: [process.env.CORS_ORIGIN_DOMAIN, process.env.CORS_ORIGIN_DOMAIN1, process.env.CORS_ORIGIN_DOMAIN2],
    node_env: {
        production: 'production',
        development: 'development'
    }
}