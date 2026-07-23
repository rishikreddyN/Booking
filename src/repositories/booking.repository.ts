
import { IdempotencyKey, Prisma } from "@prisma/client";
import { validate as isValidUUid } from "uuid";
import PrismaClient from "../prisma/client"
import { BadRequestError } from "../utils/app.error";

export async function createBooking(bookingInput: Prisma.BookingCreateInput) {

    const booking = await PrismaClient.booking.create({
        data: bookingInput
    })
    return booking;

}

export async function createIdempotency(key: string, bookingId: number) {
    const idempotencyKey = await PrismaClient.idempotencyKey.create({
        data: {

            idemKey: key,
            booking: {
                connect: {
                    id: bookingId
                }
            }
        }
    })
    return idempotencyKey;
}

export async function getIdempotencyKeyWithLock(idemkey: string, tx: Prisma.TransactionClient) {
    console.log("Received key:", idemkey);
    if (!isValidUUid(idemkey)) {
        throw new BadRequestError("Invalid key format");
    }

    const idempotencyKey: Array<IdempotencyKey> = await tx.$queryRaw(
        Prisma.raw(`SELECT * FROM IdempotencyKey WHERE idemKey = '${idemkey}' FOR UPDATE;`)
    )

    if (!idempotencyKey || idempotencyKey.length === 0) {
        throw new BadRequestError("Invalid key");
    }
    return idempotencyKey[0];
}
export async function confirmBooking(tx:Prisma.TransactionClient,id: number) {
    const booking = await tx.booking.update({
        where: {
            id: id
        },
        data: {
            status: "CONFIRMED"
        }
    })
    return booking
}

export async function cancelBooking(id: number,) {
    const booking = await PrismaClient.booking.update({
        where: {
            id: id
        },
        data: {
            status: "CANCELLED"
        }
    })
    return booking;
}

export async function finalizeBooking(tx:Prisma.TransactionClient,key: string) {
    const finalize = await tx.idempotencyKey.update({
        where: {
            idemKey: key
        },
        data: {
            finalized: true
        }
    })
    return finalize

}