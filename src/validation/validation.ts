import Joi from "joi";

export const todoValidationScheme = Joi.object({
    _id: Joi.string(),
    title: Joi.string().min(3).max(200),
    editorState: Joi.string(),
    isComplete: Joi.boolean(),
    isPublic: Joi.boolean(),
    year: Joi.date(),
});

export const registerValidationSchema = Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    checkPassword: Joi.ref("password")
});

export const editPasswordValidationSchema = Joi.object({
    email: Joi.string().email(),
    newPassword: Joi.string(),
    checkPassword: Joi.ref("newPassword")
});

export const loginValidationSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string(),
});
