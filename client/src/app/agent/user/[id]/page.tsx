'use client'

import FormUser, { FormPassword } from '@/sections/user/form'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import PrivateRoute from '@/context/PrivateRouteContext'
import { RoleType, rolePermission } from '@/features/role/type'
import {
  changeUserPasswordThunk,
  createUserThunk,
  getUserThunks,
} from '@/features/user/actions'
import { IUser, IUserForm, initUserForm } from '@/features/user/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'

interface Props {
  params: {
    id: string
  }
}

const Page = ({ params }: Props) => {
  const { dispatchAsyncThunk } = useDispatchAsync()
  const { users } = useAppSelector((state) => state.user)
  const { roles } = useAppSelector((state) => state.role)
  const { userDetails } = useAppSelector((state) => state.auth)
  const [sheet, setSheet] = useState<{
    type?: 'edit' | 'create' | 'delete' | 'changePassword'
    curForm?: IUserForm
    curUser?: IUser
  }>({})

  const userAgents = users.filter((user) => user.agentId?._id === params.id)

  const roleUserPermission =
    rolePermission[userDetails?.roleId.name as RoleType] ?? []

  const roleFilter = roles.filter((role) =>
    roleUserPermission.some((roleuser) => roleuser === role.name),
  )

  const handleSubmit = (value: IUserForm) => {
    if (sheet.type === 'create') {
      const role = roleFilter.find((x) => x._id === value.roleId)
      const { type } = sheet
      if (type === 'create' && role) {
        dispatchAsyncThunk(
          createUserThunk({
            ...value,
            role: role.name,
            agentId: params.id,
          }),
          'thêm thành công',
        )
        setSheet({})
      }
    }
  }

  const handleChangePassword = (_data: string) => {
    const { curUser, type } = sheet
    if (type === 'changePassword' && curUser) {
      dispatchAsyncThunk(
        changeUserPasswordThunk({ id: curUser._id, password: _data }),
        'success',
      )
    }
  }

  const handleReload = () => {
    dispatchAsyncThunk(getUserThunks(), 'success')
  }

  useEffect(() => {
    dispatchAsyncThunk(getUserThunks())
  }, [dispatchAsyncThunk, params])

  return (
    <PrivateRoute>
      <div className="w-full relative flex flex-col items-start md:flex-row md:items-center justify-between">
        <h3 className="text-1xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
          Danh sách thành viên Agent
        </h3>

        <div className="flex align-middle gap-2">
          <Button variant={'outline'} size={'sm'} onClick={handleReload}>
            <ReloadIcon className="me-2" />
            Reload
          </Button>

          <Sheet
            open={sheet?.type ? true : false}
            onOpenChange={(open) => {
              if (!open) setSheet({})
            }}
          >
            <SheetTrigger asChild>
              <Button
                size={'sm'}
                onClick={() => {
                  setSheet({
                    type: 'create',
                    curForm: initUserForm,
                  })
                }}
              >
                Tạo mới
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-3/4 overflow-y-auto"
              style={{ maxWidth: 800 }}
            >
              <SheetHeader>
                <SheetTitle>Thêm mới</SheetTitle>
                <SheetDescription>
                  Vui lòng nhập vào các mục bên dưới !!
                </SheetDescription>
              </SheetHeader>
              {sheet?.curForm &&
                (sheet.type === 'create' || sheet.type === 'edit') && (
                  <FormUser
                    defaultValue={sheet.curForm}
                    roles={roleFilter}
                    handleSubmit={handleSubmit}
                  />
                )}

              {sheet?.curUser && sheet.type === 'changePassword' && (
                <FormPassword handleSubmit={handleChangePassword} />
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1">
        {/* {userAgents.map((user) => {
          return (
            <CardUser
              onclickChangePassword={(user) => {
                setSheet({
                  curUser: user,
                  curForm: mapUserToUserForm(user),
                  type: 'changePassword',
                })
              }}
              key={user._id}
              user={user}
            />
          )
        })} */}
      </div>
    </PrivateRoute>
  )
}

export default Page
