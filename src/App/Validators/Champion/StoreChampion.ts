import { celebrate, Segments, Joi } from 'celebrate'

export default celebrate({
  [Segments.BODY]: Joi.object().options({ abortEarly: false }).keys({
    key: Joi.integer().required(),
  }),
})
