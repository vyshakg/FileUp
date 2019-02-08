import Joi from "joi";

const email = Joi.string()
  .email()
  .required()
  .label("Email");

const username = Joi.string()
  .min(3)
  .max(30)
  .required()
  .label("Username");

const password = Joi.string()
  .min(4)
  .max(15)
  .required()
  .label("Password");

export const signUp = Joi.object().keys({
  email,
  username,
  password
});

export const signIn = Joi.object().keys({
  email,
  password
});
