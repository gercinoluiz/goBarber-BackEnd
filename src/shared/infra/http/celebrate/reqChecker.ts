
import { celebrate, Joi, Segments } from 'celebrate';


const reqChecker =   {
  createAppointment: celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date()
    }
  }),
  provider_id: celebrate({
    [Segments.PARAMS]:{
      provider_id: Joi.string().uuid().required()
    }
  }),
  email:celebrate({
    [Segments.BODY]:{
      email: Joi.string().email().required()
    }
  }),

  resetPassword: celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().valid(Joi.ref('password'))
    }
  }),

  profile:  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  
  session:celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),

  user: celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      isProvider: Joi.boolean()
    },
  }),
}

export default reqChecker