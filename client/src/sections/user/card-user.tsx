import { Button } from '@/components/ui/button'
import { IUser } from '@/features/user/type'

type Props = {
  user: IUser
  onclickChangePassword: (_user: IUser) => void
}

const CardUser = ({ user, onclickChangePassword }: Props) => {
  const { email, roleId, phone, address } = user
  return (
    <div className=" mx-auto border-gray-200 my-3 border rounded-sm text-gray-700 mb-0.5 h-30">
      <div className={`p-3 border-t-8 flex-wrap ${colorRole[roleId.name]}`}>
        <div>
          quyền hạn:{' '}
          <span className=" bg-orange-300 text-gray-800 p-1 rounded">
            {roleId.name}
          </span>
        </div>

        <h6 className=" text-xs font-semibold text-gray-500 mt-2">email: </h6>
        <h3 className="font-semibold text-gray-800">{email}</h3>

        <h6 className=" text-xs font-semibold text-gray-500 mt-2">phone: </h6>
        <h3 className="font-semibold text-gray-800">{phone}</h3>

        <h6 className=" text-xs font-semibold text-gray-500 mt-2">address: </h6>
        <h3 className="font-semibold text-gray-800">{address}</h3>
      </div>
      <div className="border-t-2 border-gray-100 flex justify-end">
        <Button
          onClick={() => onclickChangePassword(user)}
          size={'sm'}
          className="m-1 rounded-sm"
          variant={'outline'}
        >
          change password
        </Button>
        <Button size={'sm'} className="m-1 rounded-sm" variant={'destructive'}>
          remove
        </Button>
      </div>
    </div>
  )
}

const colorRole: { [key: string]: string } = {
  'Agent.Manager': 'border-teal-600',
  'Agent.Sales': 'border-lime-600',
}

export default CardUser
