import { celebrate, Segments, Joi } from 'celebrate'

export default celebrate({
  [Segments.QUERY]: Joi.object()
    .options({ abortEarly: false })
    .keys({
      region: Joi.string().required().max(8),
      summonerName: Joi.string().required().max(20),
    }),
})
