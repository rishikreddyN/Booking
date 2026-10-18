
import dotenv from "dotenv";
dotenv.config();
const config={
    development: {
        host: process.env.host,
        username: process.env.username,
        password: process.env.password,
        database: process.env.db_name,
        dialect: "mysql"
    },
}
export default config;