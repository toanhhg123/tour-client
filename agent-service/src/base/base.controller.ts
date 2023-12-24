/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express'
import { BaseService } from './base.service'

export default class BaseController<TService extends BaseService<any>> {
  service: TService

  constructor(service: TService) {
    this.service = service
    this.getList = this.getList.bind(this)
  }

  async getList(req: Request, res: Response) {
    const data = await this.service.getList(req.query, {})
    return this.onSuccess(res, data)
  }

  onSuccess(res: Response, data: any) {
    return res.json({
      status: 'success',
      message: 'success',
      element: data
    })
  }
}
