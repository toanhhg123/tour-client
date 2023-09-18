import { Request } from 'express'
import mongoose from 'mongoose'
import { asyncHandler } from '~/core'
import { IOperatorCreate } from '~/models/operator.model'
import operService from '~/services/operator.service'
import userService from '~/services/user.service'
import { IUserCreate } from '../models/user.model'

class UserController {
  gets = asyncHandler(async (req, res) => {
    const { operatorId } = req.user
    const data = await userService.gets(operatorId)
    return res.json({ message: 'success', element: data, status: 'success' })
  })

  findUserById = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const data = await userService.findUserById(req.params.id)
    return res.json({ message: 'success', element: data, status: 'success' })
  })

  getMe = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const { _id } = req.user
    const data = await userService.findUserById(_id)
    return res.json({ message: 'success', element: data, status: 'success' })
  })

  seedAdmin = asyncHandler(async (_: Request<{ id: string }>, res) => {
    // const data = await userService.createUserWithRoleName(
    //   {
    //     email: 'admin@gmail.com',
    //     password: '12345678',
    //     name: 'admin',
    //     phone: '0909090909',
    //     address: '',
    //     sex: 'male'
    //   } as IUserCreate,
    //   'Sys.Admin'
    // )
    return res.json({
      message: 'success',
      element: 'not seed',
      status: 'success'
    })
  })

  createUserOperAdmin = asyncHandler(
    async (
      req: Request<
        unknown,
        unknown,
        { user: IUserCreate; operator: IOperatorCreate }
      >,
      res
    ) => {
      const { user, operator } = req.body

      const data = await userService.createUserWithRoleName(user, 'Oper.Admin')

      const oper = await operService.create(operator)

      data.operatorId = oper._id

      await data.save()

      return res.json({
        message: 'success',
        element: data,
        status: 'success'
      })
    }
  )

  createTourMan = asyncHandler(
    async (req: Request<unknown, unknown, IUserCreate>, res) => {
      const { operatorId } = req.user

      const data = await userService.createUserWithRoleName(
        {
          ...req.body,
          operatorId: new mongoose.Types.ObjectId(operatorId)
        },
        'TourMan'
      )

      return res.json({
        message: 'success',
        element: data,
        status: 'success'
      })
    }
  )

  createOperSales = asyncHandler(
    async (req: Request<unknown, unknown, IUserCreate>, res) => {
      const { operatorId } = req.user

      const data = await userService.createUserWithRoleName(
        {
          ...req.body,
          operatorId: new mongoose.Types.ObjectId(operatorId)
        },
        'Oper.Sales'
      )

      return res.json({
        message: 'success',
        element: data,
        status: 'success'
      })
    }
  )

  createAgentManager = asyncHandler(
    async (req: Request<unknown, unknown, IUserCreate>, res) => {
      const { operatorId } = req.user

      const data = await userService.createUserWithRoleName(
        { ...req.body, operatorId: new mongoose.Types.ObjectId(operatorId) },
        'Agent.Manager'
      )

      await data.save()

      return res.json({
        message: 'success',
        element: data,
        status: 'success'
      })
    }
  )

  createAgentSales = asyncHandler(
    async (req: Request<unknown, unknown, IUserCreate>, res) => {
      const { operatorId, agentId } = req.user

      const data = await userService.createUserWithRoleName(
        {
          ...req.body,
          operatorId: new mongoose.Types.ObjectId(operatorId),
          agentId: new mongoose.Types.ObjectId(agentId)
        },
        'Agent.Sales'
      )

      return res.json({
        message: 'success',
        element: data,
        status: 'success'
      })
    }
  )

  createOperVisa = asyncHandler(
    async (req: Request<unknown, unknown, IUserCreate>, res) => {
      const { operatorId } = req.user

      const data = await userService.createUserWithRoleName(
        {
          ...req.body,
          operatorId: new mongoose.Types.ObjectId(operatorId)
        },
        'Oper.Visa'
      )

      return res.json({
        message: 'success',
        element: data,
        status: 'success'
      })
    }
  )

  createSysAdmin = asyncHandler(
    async (req: Request<unknown, unknown, IUserCreate>, res) => {
      const data = await userService.createUser(req.body)

      await data.save()

      return res.json({
        message: 'success',
        element: data,
        status: 'success'
      })
    }
  )

  update = asyncHandler(
    async (req: Request<{ id: string }, unknown, IUserCreate>, res) => {
      const data = await userService.updateById(req.params.id, req.body)
      return res.json({
        message: 'success',
        element: data,
        status: 'success'
      })
    }
  )

  changePassword = asyncHandler(
    async (
      req: Request<{ id: string }, unknown, { password: string }>,
      res
    ) => {
      const data = await userService.changePassword(
        req.params.id,
        req.body.password,
        req.user.role
      )

      return res.json({
        message: 'success',
        element: data,
        status: 'success'
      })
    }
  )
}

export default new UserController()
