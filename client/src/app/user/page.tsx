'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { createColumnHelper } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import FormUser, { FormPassword } from './form'
import TableUser from './table'

const columnHelper = createColumnHelper<IUser>()

const Page = () => {
  const { users, agents } = useAppSelector((state) => state.user)
  const { roles } = useAppSelector((state) => state.role)
  const { userDetails } = useAppSelector((state) => state.auth)

  const [sheet, setSheet] = useState<{
    type?: 'edit' | 'create' | 'changePassword'
    dataForm?: IUserForm
    curUser?: IUser
  }>({})

  const roleUserPermission =
    rolePermission[userDetails?.roleId.name as RoleType] ?? []

  const roleFilter = roles.filter((role) =>
    roleUserPermission.some((roleuser) => roleuser === role.name),
  )

  const { dispatchAsyncThunk } = useDispatchAsync()

  const handleReload = () => {
    dispatchAsyncThunk(getUserThunks(), 'reload success')
  }

  const handleSubmitForm = (value: IUserForm) => {
    const role = roleFilter.find((x) => x._id === value.roleId)
    const { type } = sheet
    if (type === 'create' && role) {
      dispatchAsyncThunk(
        createUserThunk({
          ...value,
          role: role.name,
          agentId: value.agentId,
        }),
        'thêm thành công',
      )
    }

    setSheet({})
  }

  const handleChangePassword = (_data: string) => {
    const { curUser, type } = sheet
    if (type === 'changePassword' && curUser) {
      dispatchAsyncThunk(
        changeUserPasswordThunk({ id: curUser._id, password: _data }),
        'success',
      )
    }
    setSheet({})
  }

  useEffect(() => {
    dispatchAsyncThunk(getUserThunks())
  }, [dispatchAsyncThunk])

  const ColumsAction = useMemo(() => {
    return columnHelper.group({
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Button
                  onClick={() => {
                    setSheet({
                      type: 'changePassword',
                      curUser: row.original,
                    })
                  }}
                  variant={'outline'}
                  size={'sm'}
                >
                  Thay đổi mật khẩu
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant={'default'}
                  className="bg-red-500 text-white w-full"
                  size={'sm'}
                >
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      header: 'Thao tác',
    })
  }, [])

  return (
    <PrivateRoute>
      <div className="w-full relative flex flex-col items-start md:flex-row md:items-center justify-between">
        <h3 className="text-1xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
          Danh sách User
        </h3>

        <div className="flex align-middle gap-2">
          <Button variant={'outline'} size={'sm'} onClick={handleReload}>
            <ReloadIcon className="me-2" />
            Reload
          </Button>
          <Sheet
            open={sheet?.type !== undefined}
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
                    dataForm: {
                      ...initUserForm,
                      roleId: roleFilter[0]?._id ?? '',
                      agentId:
                        userDetails?.roleId.name === 'Oper.Sales'
                          ? agents?.at(0)?._id
                          : undefined,
                    },
                  })
                }}
              >
                Tạo mới
              </Button>
            </SheetTrigger>
            <SheetContent className=" overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Create User</SheetTitle>
                <SheetDescription>
                  Vui lòng nhập vào các mục bên dưới !!
                </SheetDescription>
              </SheetHeader>
              {sheet?.dataForm && sheet.type === 'create' && (
                <FormUser
                  handleSubmit={handleSubmitForm}
                  defaultValue={sheet.dataForm}
                  roles={roleFilter}
                />
              )}

              {sheet?.curUser && sheet.type === 'changePassword' && (
                <FormPassword handleSubmit={handleChangePassword} />
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <TableUser data={users} columnsAction={ColumsAction} />
    </PrivateRoute>
  )
}

export default Page
