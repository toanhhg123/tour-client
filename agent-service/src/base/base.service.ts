/* eslint-disable @typescript-eslint/no-explicit-any */

import { AnyKeys, FilterQuery, InferSchemaType, Model, Schema } from 'mongoose'
import clientBooking from '~/client/client.model'
import { MONGOOSE } from '~/config/consts'
import Logger from '~/config/logger'

export type TKey = 'client'

export type FilterOptions = {
  skip?: number
  keyword?: string
}

export class BaseService<TSchema extends InferSchemaType<Schema>> {
  model: Model<TSchema>
  static models: Record<TKey, Model<InferSchemaType<Schema>>> = {} as any
  searchKeys: string[] = []

  constructor(model: Model<TSchema>, searchKeys: string[]) {
    Logger.info(`${model.modelName} injected to service`)

    this.model = model as typeof model
    this.searchKeys = searchKeys

    // ================= BIND THIS======================
    this.getList = this.getList.bind(this)
  }

  async getList(
    filter: FilterQuery<TSchema>,
    { skip, keyword }: FilterOptions
  ) {
    if (keyword && this.searchKeys.length) {
      filter.$or = this.searchKeys.map((key) => ({
        [key]: { $regex: keyword, $options: 'i' }
      })) as any
    }

    const data = await this.model.find(
      { ...filter },
      {},
      { limit: MONGOOSE.LIMIT_PAGE, skip }
    )

    const totalPage = await this.model.count()

    return {
      list: data,
      keyword: keyword,
      limit: MONGOOSE.LIMIT_PAGE,
      skip: skip || 0,
      pageIndex: Math.ceil((skip || 0) / MONGOOSE.LIMIT_PAGE),
      totalPage: totalPage
    }
  }

  create(body: AnyKeys<TSchema>) {
    return this.model.create(body)
  }

  static resister(key: TKey, model: Model<InferSchemaType<any>>) {
    this.models[key] = model
  }

  static getModel(key: TKey) {
    return this.models[key]
  }
}

BaseService.resister('client', clientBooking)
