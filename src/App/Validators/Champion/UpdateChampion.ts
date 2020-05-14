import { celebrate, Segments, Joi } from 'celebrate'

export default celebrate({
  [Segments.PARAMS]: Joi.object().options({ abortEarly: false }).keys({
    key: Joi.number().required(),
  }),
})
