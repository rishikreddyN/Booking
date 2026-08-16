import { createBookingDto } from "../DTO/booking.dto";
import { confirmBooking, createBooking, createIdempotency, finalizeBooking, getIdempotencyKeyWithLock } from "../repositories/booking.repository"
import { BadRequestError, NotFoundError } from "../utils/app.error";
import { generateKey } from "../utils/generateKey";
import PrismaClient from "../prisma/client"
import { redlock } from "../config/redis.config";
import { serverConfig } from "../config";



export async function createBookingService(createBookingDTO: createBookingDto) {
    const ttl = serverConfig.LOCK_TTL
    const bookingResource = `hotel:${createBookingDTO.hotelId}`;



    try {
        await redlock.acquire([bookingResource], ttl);
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


    catch (err) {
        throw new BadRequestError("Booking already exists for this user and hotel combination");
    }
}
export async function confirmBookingService(idempotencyKey: string) {

    return await PrismaClient.$transaction(async (tx) => {
        
        const IdempotencyKeyData = await getIdempotencyKeyWithLock(idempotencyKey, tx);

        if (!IdempotencyKeyData) {
            throw new NotFoundError("The key does not exist buddy")
        }
        if (IdempotencyKeyData.finalized) {
            throw new BadRequestError("Booking already confirmed");
        }
        const booking = await confirmBooking(tx, IdempotencyKeyData.bookingId);
     
        await finalizeBooking(tx, idempotencyKey)
        
        return booking;
    })
}