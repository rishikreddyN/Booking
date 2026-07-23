
import express from "express"
import { Express } from "express"
import { booking } from "./routes/v1/booking.route";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv"
const app:Express= express()
dotenv.config()
app.use(express.json());
app.use("/api/v1/booking",booking)

app.use(
  (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
);


app.listen(process.env.PORT,()=>{
    console.log(`Server is listening from the PORT ${process.env.PORT}`)
})