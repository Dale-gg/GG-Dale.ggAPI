import { celebrate, Segments, Joi } from 'celebrate'

export default celebrate({
  [Segments.PARAMS]: Joi.object()
    .options({ abortEarly: false })
    .keys({
      id: Joi.string().required().max(40),
    }),
})
