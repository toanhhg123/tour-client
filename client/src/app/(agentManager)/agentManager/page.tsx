'use client'
import { Button } from '@/components/ui/button'
import PrivateRoute from '@/context/PrivateRouteContext'
import { IAgent } from '@/features/user/type'
import {
  createAgentThunk,
  getAgentsThunk,
  updateAgentThunk,
  updateSalesAgentThunk,
} from '@/features/user/actions'
import { AgentCreate, initSupplierForm } from '@/features/user/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import BoxFilter, { Filter } from '@/sections/agent/box-filter'
import CardAgent from '@/sections/agent/card-agent'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon, UpdateIcon } from '@radix-ui/react-icons'
import _ from 'lodash'
import { CheckCircleIcon, PenLine, Plus, Users, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import BookingsAgent from '@/sections/agent/bookings-agent'
import UserAgents from '@/sections/agent/users-agent'
import FormAgent from '@/sections/agent/form-agent'
import FormSelectUser from '@/sections/user/form-select-user'

const Page = () => {
  const { agents, usersInOperator } = useAppSelector((state) => state.user)
  const [agentView, setAgentView] = useState(agents)
  const { dispatchAsyncThunk } = useDispatchAsync()
  const [sheet, setSheet] = useState<{
    type?: 'create' | 'edit' | 'bookings' | 'users' | 'update-sales'
    curAgent?: IAgent
    agentForm?: AgentCreate
  }>({})

  const operSales = usersInOperator.filter(
    (user) => user.roleId.name === 'Oper.Sales',
  )
  const handleReload = () => {
    dispatchAsyncThunk(getAgentsThunk(), 'success')
  }

  const handleFilter = ({ search, saleId }: Filter) => {
    let newState = agents
    if (search)
      newState = newState.filter(
        (agent) => agent.email.match(search) || agent.name.match(search),
      )

    if (saleId)
      newState = newState.filter((agent) => agent.operSaleId === saleId)

    setAgentView(newState)
  }

  const handleSubmitForm = (_form: AgentCreate) => {
    const { type, agentForm, curAgent } = sheet

    if (type === 'create' && agentForm)
      return dispatchAsyncThunk(
        createAgentThunk(_form),
        'create agent success',
        () => {
          setSheet({})
        },
      )

    if (type === 'edit' && agentForm && curAgent)
      return dispatchAsyncThunk(
        updateAgentThunk({ id: curAgent._id, agent: _form }),
        'update agent success',
        () => {
          setSheet({})
        },
      )
  }

  const handleChangeSales = (_userId: string) => {
    const { type, curAgent } = sheet
    if (type === 'update-sales' && curAgent)
      return dispatchAsyncThunk(
        updateSalesAgentThunk({ id: curAgent._id, operSalesId: _userId }),
        'update  success',
        () => {
          setSheet({})
        },
      )
  }

  useEffect(() => {
    dispatchAsyncThunk(getAgentsThunk())
  }, [dispatchAsyncThunk])

  useEffect(() => {
    setAgentView(agents)
  }, [agents])

  return (
    <PrivateRoute roles={['Manager', 'Oper.Admin']}>
      <div className="w-full text-gray-700  flex flex-wrap  justify-between gap-2">
        <BoxFilter
          users={operSales}
          onClear={handleReload}
          onFilter={handleFilter}
        />

        <div className="flex-1">
          <div className="flex gap-1">
            <Button variant={'outline'} size={'mini'} onClick={handleReload}>
              <ReloadIcon className="w-[12px] mr-1" /> reload
            </Button>

            <Button
              onClick={() => {
                setSheet({ type: 'create', agentForm: initSupplierForm })
              }}
              variant={'outLinePrimary'}
              size={'mini'}
            >
              <Plus className="w-[12px]" /> create
            </Button>
          </div>
          <div className="border my-2 p-2 min-h-screen overflow-y-auto">
            {sheet.type ? (
              <>
                <div className="relative p-2 border my-2 border-blue-100">
                  <Button
                    variant={'destructive'}
                    size={'mini'}
                    onClick={() => setSheet({})}
                  >
                    <X /> close
                  </Button>

                  {sheet.type === 'bookings' && sheet.curAgent && (
                    <BookingsAgent agent={sheet.curAgent} />
                  )}

                  {sheet.type === 'users' && sheet.curAgent && (
                    <UserAgents agent={sheet.curAgent} />
                  )}

                  {['create', 'edit'].includes(sheet.type) &&
                    sheet.agentForm && (
                      <FormAgent
                        initData={sheet.agentForm}
                        onSave={handleSubmitForm}
                      />
                    )}

                  {sheet.type === 'update-sales' && sheet.curAgent && (
                    <div className="m-2">
                      <div className="text-sm my-2 font-bold">
                        agent infomation
                      </div>
                      <CardAgent agent={sheet.curAgent} />
                      <FormSelectUser
                        initData={sheet.curAgent.operSaleId}
                        onSubmit={handleChangeSales}
                        users={usersInOperator.filter(
                          (user) => user.roleId.name === 'Oper.Sales',
                        )}
                      />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {agentView.map((agent) => (
                  <CardAgent
                    agent={agent}
                    key={agent._id}
                    renderAction={(agent) => {
                      return (
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <Button
                            onClick={() => {
                              setSheet({
                                type: 'update-sales',
                                curAgent: agent,
                              })
                            }}
                            size={'mini'}
                            variant={'warningOutline'}
                          >
                            <UpdateIcon className="w-[12px] mr-1" />
                            sales
                          </Button>

                          <Button
                            onClick={() => {
                              setSheet({
                                type: 'edit',
                                agentForm: _.omit(
                                  agent,
                                  '_id',
                                  'createdAt',
                                  'updatedAt',
                                ),
                                curAgent: agent,
                              })
                            }}
                            size={'mini'}
                            variant={'outLineSuccess'}
                          >
                            <PenLine className="w-[12px] mr-1" />
                            edit
                          </Button>

                          <Button
                            onClick={() => {
                              setSheet({
                                type: 'users',
                                curAgent: agent,
                              })
                            }}
                            size={'mini'}
                            variant={'outLinePrimary'}
                          >
                            <Users className="w-[12px] mr-1" />
                            users
                          </Button>

                          <Button
                            onClick={() => {
                              setSheet({
                                type: 'bookings',
                                curAgent: agent,
                              })
                            }}
                            size={'mini'}
                          >
                            <CheckCircleIcon className="w-[12px] mr-1" />
                            bookings
                          </Button>
                        </div>
                      )
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </PrivateRoute>
  )
}

export default Page
