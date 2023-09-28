/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { ResponseError } from '~/types'

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  const err = new ResponseError('not found', 404)
  next(err)
}

export const handleErrorResponse = (error: any) => {
  let customError = error

  console.log({ error })

  if (!(error instanceof ResponseError)) {
    customError = new ResponseError(
      process.env.NODE_ENV === 'production'
        ? 'Oh no, this is embarrasing. We are having troubles my friend'
        : error.message
    )
  }
  return customError
}

export function handleError(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  const errorRes = handleErrorResponse(error)
  return response.status(errorRes.status).json(errorRes)
}
