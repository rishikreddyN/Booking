
import { Prisma } from "@prisma/client";
import PrismaClient from "../prisma/client"

export async function createBooking(bookingInput:Prisma.BookingCreateInput) {

    const booking=await PrismaClient.booking.create({
        data:bookingInput
    })
    return booking;
    
}

export async function createIdempotency(key:string,bookingId:number) {
    const idempotencyKey=await PrismaClient.idempotencyKey.create({
        data:{

            idemKey:key, 
            booking:{
                connect:{
                    id:bookingId
                }
            }
        }
    })
    return idempotencyKey;
}

export async function getIdempotencyKey(key:string) {
        const findBooking=await PrismaClient.idempotencyKey.findUnique({
            where:{
                idemKey:key
            }
        })
        return findBooking
}
export async function confirmBooking(id:number)
{
    const booking=await PrismaClient.booking.update({
        where:{
            id:id
        },
        data:{
            status:"CONFIRMED"
        }
    })
    return booking
}

export async function cancelBooking(id:number) {
    const booking=await PrismaClient.booking.update({
        where:{
            id:id
        },
        data:{
            status:"CANCELLED"
        }
    })
    return booking;
}

export async function finalizeBooking(key:string)
{
   const finalize=await PrismaClient.idempotencyKey.update({
     where:{
        idemKey:key
    },
    data:{
        finalized:true
    }
   })
   return finalize

}