/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { IResponse } from '~/types'

export const asyncHandler = (
  controller: <T = any>(
    req: Request<any, any, any, any>,
    res: Response<IResponse<any>>,
    next: NextFunction
  ) => Promise<Response<any, Record<string, IResponse<T>>> | any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    controller(req, res, next).catch(next)
  }
}
