import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IAgent } from '@/features/user/type'
import { ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
  agent: IAgent
  onClickEdit?: (_agent: IAgent) => void
  onClickDelete?: (_agent: IAgent) => void
}

const CardAgent = ({ agent, onClickDelete, onClickEdit }: Props) => {
  return (
    <Card className=" border-spacing-1 shadow-sm w-[300px] p-3 border-gray-100">
      <CardDescription>Thông tin Agent</CardDescription>

      <CardContent className="p-0">
        <h6 className=" text-xs font-semibold text-gray-500">name: </h6>
        <h3 className="font-semibold text-gray-800">{agent.name}</h3>

        <h6 className=" text-xs font-semibold text-gray-500 mt-2">email: </h6>
        <h3 className="font-semibold text-gray-800">{agent.email}</h3>

        <h6 className=" text-xs font-semibold text-gray-500 mt-2">phone: </h6>
        <h3 className="font-semibold text-gray-800">{agent.phone}</h3>

        <h6 className=" text-xs font-semibold text-gray-500 mt-2">address: </h6>
        <h3 className="font-semibold text-gray-800">{agent.address}</h3>

        <div className="flex gap-2 my-2 flex-wrap justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full" size={'sm'}>
                see all <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <Button
                  size={'sm'}
                  className="w-full"
                  variant={'success'}
                  onClick={() => {
                    onClickEdit && onClickEdit(agent)
                  }}
                >
                  edit
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  size={'sm'}
                  className="w-full"
                  variant={'destructive'}
                  onClick={() => {
                    onClickDelete && onClickDelete(agent)
                  }}
                >
                  delete
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link
                  href={`/agent/user/${agent._id}`}
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'outline',
                    className: 'w-full',
                  })}
                >
                  users
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link
                  href={`/agent/booking/${agent._id}`}
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'outline',
                    className: 'w-full',
                  })}
                >
                  Bookings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardAgent
