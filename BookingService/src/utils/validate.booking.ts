import { ZodSchema } from "zod";
import type { NextFunction, Request,Response } from "express";
export const validate = (schema: ZodSchema) => {
    return (req:Request, res:Response, next:NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                errors: result.error.issues,
            });
        }

        req.body = result.data; // validated data
        next();
    };
};