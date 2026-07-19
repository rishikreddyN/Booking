import { createBookingDto } from "../DTO/booking.dto";
import { confirmBooking, createBooking, createIdempotency, finalizeBooking, getIdempotencyKey } from "../repositories/booking.repository"
import { BadRequestError, NotFoundError } from "../utils/app.error";
import { generateKey } from "../utils/generateKey";

export async function createBookingService(createBookingDTO:createBookingDto){
     const booking = await createBooking({
            userId: createBookingDTO.userId,
            hotelId: createBookingDTO.hotelId,
            totalGuests: createBookingDTO.totalGuests,
            bookingAmount: createBookingDTO.bookingAmount,
        });
    const idempotencyKey=await generateKey();

    await createIdempotency(idempotencyKey,booking.id);
    return {
        bookingId:booking.id,
        idempotencyKey:idempotencyKey
    }

}

export async function confirmBookingService(idempotencyKey:string) {
        const IdempotencyKeyData=await getIdempotencyKey(idempotencyKey);

        if(!IdempotencyKeyData){
            throw new NotFoundError("The key does not exist buddy")
        }
        if(IdempotencyKeyData.finalized){
            throw new BadRequestError("Booking already confirmed");
        }
        const booking= await confirmBooking(IdempotencyKeyData.bookingId);
        await finalizeBooking(idempotencyKey)
        return booking;
}