import { NextFunction, Request, Response } from "express";
import { createTripSchema, loginUserSchema, newUserSchema, updateUserSchema } from "../validation/validation";

import Joi from '@hapi/joi';

export class JoiValidation {
    static async validateRegisterData(req: Request, res: Response, next: NextFunction): Promise<void> {
        const body = req.body || {};
        const validation = await newUserSchema(body);
        JoiValidation.validate(validation, res, next);
    }

    static async validateLoginData(req: Request, res: Response, next: NextFunction): Promise<void> {
        const body = req.body || {};
        const validation = await loginUserSchema(body);
        JoiValidation.validate(validation, res, next);
    }

    static async validateTripData(req: Request, res: Response, next: NextFunction): Promise<void> {
        const body = req.body || {};
        const validation = await createTripSchema(body);
        JoiValidation.validate(validation, res, next);
    }

    static async validateUpdateUserData(req: Request, res: Response, next: NextFunction): Promise<void> {
        const body = req.body || {};
        const validation = await updateUserSchema(body);
        JoiValidation.validate(validation, res, next);
    }
    

    static validate(validation: Joi.ValidationResult, res: Response, next: NextFunction) {
        if (validation?.error !== undefined) {
            const errorDetails = validation?.error.details.map((error) => {
                return {
                    message: error.message.replace(/['"]/g, ""),
                    key: error.path.join("."),
                };
            });

            const message = validation?.error.details[0].message.replace(
                /['"]/g,
                ""
            );

            res.status(400).json({
                message: message,
                details: errorDetails,
            });
            res.end();
        } else {
            next();
        }
    }

}
