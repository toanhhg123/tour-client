'use client'
import { Button } from '@/components/ui/button'
import PrivateRoute from '@/context/PrivateRouteContext'
import { RoleType, rolePermission } from '@/features/role/type'
import {
  changeUserPasswordThunk,
  createUserThunk,
  getUsersInOperatorThunk,
} from '@/features/user/actions'
import { IUser, IUserForm, initUserForm } from '@/features/user/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import BoxFilter, { Filter } from '@/sections/user/box-filter'
import CardUser from '@/sections/user/cardUser'
import FormUser, { FormPassword } from '@/sections/user/form'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Lock, PenLine, Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const Page = () => {
  const { roles } = useAppSelector((state) => state.role)
  const { agents, usersInOperator } = useAppSelector((state) => state.user)
  const { userDetails } = useAppSelector((state) => state.auth)
  const [users, setUsers] = useState(usersInOperator)

  const { dispatchAsyncThunk } = useDispatchAsync()
  const [sheet, setSheet] = useState<{
    type?: 'create' | 'edit' | 'change-password'
    curUser?: IUser
  }>({})

  const roleAllows =
    rolePermission[(userDetails?.roleId.name || '') as unknown as RoleType] ||
    []
  const rolesForm = roles.filter((role) => roleAllows.includes(role.name))

  const handleSubmitUser = async (userForm: IUserForm) => {
    const { type } = sheet
    if (type === 'create') {
      const role = roles.find((role) => role._id === userForm.roleId)
      if (role)
        await dispatchAsyncThunk(
          createUserThunk({ ...userForm, role: role?.name }),
          'success',
          () => setSheet({}),
        )
    }
  }

  const handleChangePassword = (_data: string) => {
    const { curUser } = sheet
    if (curUser)
      dispatchAsyncThunk(
        changeUserPasswordThunk({ id: curUser._id, password: _data }),
        'success',
        () => setSheet({}),
      )
  }

  const handleFilter = ({ search, sex, agentId, roleId }: Filter) => {
    let newState = usersInOperator

    if (search)
      newState = newState.filter(
        (user) => user.name.match(search) || user.email.match(search),
      )

    if (sex) newState = newState.filter((user) => user.sex === sex)
    if (agentId)
      newState = newState.filter((user) => user.agentId?._id === agentId)
    if (roleId) newState = newState.filter((user) => user.roleId._id === roleId)

    setUsers(newState)
  }

  const handleReload = () => {
    dispatchAsyncThunk(getUsersInOperatorThunk(), 'success')
  }

  useEffect(() => {
    setUsers(usersInOperator)
  }, [usersInOperator])

  return (
    <PrivateRoute>
      <div className="w-full text-gray-700  flex flex-wrap  justify-between gap-2">
        <BoxFilter
          onClear={handleReload}
          roles={roles}
          agents={agents}
          onFilter={handleFilter}
        />

        <div className="flex-1">
          <div className="flex gap-1">
            <Button variant={'outline'} size={'mini'} onClick={handleReload}>
              <ReloadIcon className="w-[12px] mr-1" /> reload
            </Button>

            <Button
              onClick={() => {
                setSheet({ type: 'create' })
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

                  {sheet.type === 'change-password' && sheet.curUser && (
                    <div className="my-2">
                      <h3 className="text-[14px] font-semibold my-2">
                        User Infomation
                      </h3>
                      <CardUser user={sheet.curUser} />
                    </div>
                  )}

                  {sheet.type === 'create' && (
                    <div className="my-2">
                      <FormUser
                        defaultValue={initUserForm}
                        handleSubmit={handleSubmitUser}
                        roles={rolesForm}
                      />
                    </div>
                  )}

                  {sheet.type === 'change-password' && sheet.curUser && (
                    <div className="my-2">
                      <FormPassword handleSubmit={handleChangePassword} />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {users.map((user) => (
                  <CardUser
                    user={user}
                    key={user._id}
                    renderAction={(user) => {
                      return (
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            onClick={() => {
                              setSheet({ type: 'edit', curUser: user })
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
