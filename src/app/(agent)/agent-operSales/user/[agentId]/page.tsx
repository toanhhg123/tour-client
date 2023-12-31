'use client'
import { Button } from '@/components/ui/button'
import PrivateRoute from '@/context/PrivateRouteContext'
import {
  changeUserPasswordThunk,
  createUserThunk,
  getAgentsThunk,
  getUsersInOperatorThunk,
} from '@/features/user/actions'
import { IUser, IUserForm, initUserForm } from '@/features/user/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import BoxFilter, { Filter } from '@/sections/agent-operSales/user/box-filter'
import CardAgentAccordion from '@/sections/agent/card-agent-accordion'
import CardUser from '@/sections/user/cardUser'
import FormUser, { FormPassword } from '@/sections/user/form'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import { FileQuestionIcon, Lock, Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
  params: {
    agentId: string
  }
}

const Page = ({ params }: Props) => {
  const { usersInOperator, agents } = useAppSelector((state) => state.user)
  const { roles } = useAppSelector((state) => state.role)
  const [users, setUsers] = useState<IUser[]>([])
  const [sheet, setSheet] = useState<{
    type?: 'create' | 'edit' | 'change-password'
    curUser?: IUser
    curForm?: IUserForm
  }>({})

  console.log(usersInOperator, agents)

  const agent = agents.find((agent) => agent._id === params.agentId)

  const handleCloseSheet = () => setSheet({})

  const roleFilter = roles.filter(
    ({ name }) => name === 'Agent.Manager' || name === 'Agent.Sales',
  )

  const { dispatchAsyncThunk } = useDispatchAsync()

  const handleReload = async () => {
    await dispatchAsyncThunk(getAgentsThunk())
    await dispatchAsyncThunk(getUsersInOperatorThunk(), 'success')
  }

  function handleSave(_data: IUserForm): void {
    const { type } = sheet
    const role = roleFilter.find((role) => role._id === _data.roleId)
    if (type === 'create' && role) {
      dispatchAsyncThunk(
        createUserThunk({ ..._data, agentId: params.agentId, role: role.name }),
        'success',
        handleCloseSheet,
      )
    }
  }

  const handleSubmitChangePassword = (_data: string) => {
    const { curUser } = sheet
    if (curUser)
      dispatchAsyncThunk(
        changeUserPasswordThunk({ id: curUser._id, password: _data }),
        'success',
        handleCloseSheet,
      )
  }

  const handleFilter = ({ search, sex, roleId }: Filter) => {
    let newState = usersInOperator.filter(
      (user) => user.agentId?._id === params.agentId,
    )

    if (search)
      newState = newState.filter(
        (user) => user.name.match(search) || user.email.match(search),
      )

    if (sex) newState = newState.filter((user) => user.sex === sex)

    if (roleId) newState = newState.filter((user) => user.roleId._id === roleId)

    setUsers(newState)
  }

  useEffect(() => {
    setUsers(
      usersInOperator.filter((user) => user.agentId?._id === params.agentId),
    )
  }, [usersInOperator, params])

  return (
    <PrivateRoute roles={['Oper.Sales']}>
      <div className="w-full text-gray-700  flex flex-wrap  justify-between gap-2">
        <div className="flex flex-col gap-2">
          <BoxFilter
            onClear={handleReload}
            roles={roleFilter}
            onFilter={handleFilter}
          />
          {agent && <CardAgentAccordion agent={agent} />}
        </div>

        <div className="flex-1">
          <div className="flex gap-1">
            <Button variant={'outline'} size={'mini'} onClick={handleReload}>
              <ReloadIcon className="w-[12px] mr-1" /> reload
            </Button>

            <Button
              onClick={() => {
                setSheet({ type: 'create', curForm: initUserForm })
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
                    size={'sm'}
                    onClick={() => setSheet({})}
                  >
                    <X className="mr-1" /> close
                  </Button>

                  {sheet.type === 'create' && sheet.curForm && (
                    <div className="my-2">
                      <h3 className="text-[14px] font-semibold my-2">
                        Create new user
                      </h3>
                      <FormUser
                        roles={roleFilter}
                        defaultValue={sheet.curForm}
                        handleSubmit={handleSave}
                      />
                    </div>
                  )}

                  {sheet.type === 'change-password' && sheet.curUser && (
                    <div className="my-2">
                      <h3 className="text-[14px] font-semibold my-2">
                        User Infomation
                      </h3>
                      <CardUser user={sheet.curUser} />

                      <FormPassword handleSubmit={handleSubmitChangePassword} />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {users.length ? (
                  users.map((user) => (
                    <CardUser
                      user={user}
                      key={user._id}
                      renderAction={(user) => {
                        return (
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              onClick={() => {
                                setSheet({
                                  type: 'change-password',
                                  curUser: user,
                                })
                              }}
                              size={'mini'}
                              variant={'outLinePrimary'}
                            >
                              <Lock className="w-[12px] mr-1" />
                              change password
                            </Button>
                          </div>
                        )
                      }}
                    />
                  ))
                ) : (
                  <div className="p-3 flex gap-1 justify-center text-center border border-red-200 font-bold">
                    <FileQuestionIcon /> agent has no users yet
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </PrivateRoute>
  )
}

export default Page
