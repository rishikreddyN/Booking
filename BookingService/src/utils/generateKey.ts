import {v4 as uuid} from "uuid"

export async function generateKey() {
    return await uuid();
}