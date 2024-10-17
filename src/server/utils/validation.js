import Joi from 'joi';

export const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    dateOfBirth: Joi.date().iso().required(),
    gender: Joi.string().required(),
  });

  return schema.validate(user);
};

export const validateProfile = (profile) => {
  const schema = Joi.object({
    bio: Joi.string().max(500),
    photos: Joi.array().items(Joi.string()).min(1).max(5),
    interests: Joi.array().items(Joi.string()),
    location: Joi.object({
      type: Joi.string().valid('Point').required(),
      coordinates: Joi.array().items(Joi.number()).length(2).required(),
    }),
    preferences: Joi.object({
      ageRange: Joi.object({
        min: Joi.number().min(18).max(99),
        max: Joi.number().min(18).max(99),
      }),
      distance: Joi.number().min(1).max(500),
      genderPreference: Joi.string(),
    }),
  });

  return schema.validate(profile);
};