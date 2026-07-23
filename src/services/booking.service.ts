import { createBookingDto } from "../DTO/booking.dto";
import { confirmBooking, createBooking, createIdempotency, finalizeBooking, getIdempotencyKeyWithLock } from "../repositories/booking.repository"
import { BadRequestError, NotFoundError } from "../utils/app.error";
import { generateKey } from "../utils/generateKey";
import PrismaClient from "../prisma/client"

export async function createBookingService(createBookingDTO: createBookingDto) {
    const booking = await createBooking({
        userId: createBookingDTO.userId,
        hotelId: createBookingDTO.hotelId,
        totalGuests: createBookingDTO.totalGuests,
        bookingAmount: createBookingDTO.bookingAmount,
    });
    const idempotencyKey = await generateKey();

    await createIdempotency(idempotencyKey, booking.id);
    return {
        bookingId: booking.id,
        idempotencyKey: idempotencyKey
    }

}

export async function confirmBookingService(idempotencyKey: string) {



    return await  PrismaClient.$transaction(async (tx) => {
        console.log("1");
        const IdempotencyKeyData = await getIdempotencyKeyWithLock(idempotencyKey, tx);
        
        if (!IdempotencyKeyData) {
            throw new NotFoundError("The key does not exist buddy")
        }
        if (IdempotencyKeyData.finalized) {
            throw new BadRequestError("Booking already confirmed");
        }
        const booking = await confirmBooking(tx, IdempotencyKeyData.bookingId);
        console.log("2");
        await finalizeBooking(tx,idempotencyKey)
        console.log("3");
        return booking;
    })
}