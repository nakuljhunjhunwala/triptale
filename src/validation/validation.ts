import Joi, { ValidationResult } from "@hapi/joi";

export function newUserSchema(data): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const Schema = Joi.object({
      name: Joi.string().required().min(3),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      phoneNo: Joi.number().min(10).optional(),
      gender: Joi.string().optional(),
      countryCode: Joi.string().optional(),
      profilePhoto: Joi.string().optional()
    });

    const returnObject = Schema.validate(data,{
      abortEarly:false
    });
    resolve(returnObject);
  });
}

export function updateUserSchema(data): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const Schema = Joi.object({
      name: Joi.string().optional().min(3),
      gender: Joi.string().optional(),
      profilePhoto: Joi.string().optional()
    });

    const returnObject = Schema.validate(data,{
      abortEarly:false
    });
    resolve(returnObject);
  });
}

export function loginUserSchema(data): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const Schema = Joi.object({
      name: Joi.string().optional(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const returnObject = Schema.validate(data,{
      abortEarly:false
    });
    resolve(returnObject);
  });
}

export function createTripSchema(data): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const Schema = Joi.object({
      title: Joi.string().required(),
      isPrivate: Joi.boolean(),
      description: Joi.string().optional(),
      membersCount: Joi.number().optional(),
    });

    const returnObject = Schema.validate(data,{
      abortEarly:false
    });
    resolve(returnObject);
  });
}

