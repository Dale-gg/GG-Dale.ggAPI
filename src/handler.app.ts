import { SecResponse } from '@jlenon7/dedsec/build/Responses'
import { Request, Response, NextFunction } from 'express'
import AppError from './App/Errors/AppError'

const env = process.env.NODE_ENV

class Handler {
  public createHandler(
    err: Error | any,
    request: Request,
    response: Response,
    _: NextFunction,
  ): Response<Error | AppError> {
    const dedsec = new SecResponse()

    if (err instanceof AppError) {
      const res = dedsec.withError(
        err.dataObj,
        err.message,
        'null',
        err.statusCode,
      )

      return response.status(err.statusCode).json(res)
    } else if (err.joi) {
      const res = dedsec.withValidationError({}, err.message)

      return response.status(400).json(res)
    } else if (env === 'testing' || env === 'development') {
      const res = dedsec.withError(err, err.message)

      return response.status(500).json(res)
    } else {
      const res = dedsec.withError({}, 'Internal server error')

      return response.status(500).json(res)
    }
  }
}

export default Handler
