
import express from "express"
import { Express } from "express"
import { booking } from "./routes/v1/booking.route";
import dotenv from "dotenv"
import { appErrorHandler, genericErrorHandler } from "./middlewares/error.middleware";
const app:Express= express()
dotenv.config()
app.use(express.json());
app.use("/api/v1/booking",booking)


app.use(appErrorHandler);
app.use(genericErrorHandler);


app.listen(process.env.PORT,()=>{
    console.log(`Server is listening from the PORT ${process.env.PORT}`)
})