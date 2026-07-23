import type{Request,Response,Express} from "express"

import express from "express"
import { validateBooking } from "../../validators/booking.validator"
import { validate } from "../../utils/validate.booking"
import { confirmBookingHandler, createBookingHandler } from "../../controllers/booking.controller"

export const booking=express.Router()

booking.post("/",validate(validateBooking),createBookingHandler);

booking.post("/confirm/:idempotencyKey",confirmBookingHandler);