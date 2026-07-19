import { confirmBooking, finalizeBooking } from "../repositories/booking.repository";
import { confirmBookingService, createBookingService } from "../services/booking.service"

import { Request,Response } from "express";
export const createBookingHandler=async (req:Request,res:Response)=> {
    
    const booking=await createBookingService(req.body);

    res.status(202).json({
        success:true,
        message:"Booking created successfully",
        data:booking
    })
}
type ConfirmParams = {
  idempotencyKey: string;
};

export const confirmBookingHandler = async (
  req: Request<ConfirmParams>,
  res: Response
) => {
  const booking = await confirmBookingService(req.params.idempotencyKey);

  res.status(200).json({
    bookingId: booking.id,
    status: booking.status,
  });
};
