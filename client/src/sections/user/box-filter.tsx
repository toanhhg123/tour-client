'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IRole } from '@/features/role/type'
import { IAgent } from '@/features/user/type'
import { Search, ShieldQuestionIcon } from 'lucide-react'
import { FormEventHandler, useState } from 'react'

export type Filter = {
  search: string
  roleId: string
  sex: string
  agentId: string
}

type Props = {
  roles: IRole[]
  agents: IAgent[]
  onFilter: (_filter: Filter) => void
}

const BoxFilter = ({ roles, agents, onFilter }: Props) => {
  const [filter, setFilter] = useState<Filter>({
    search: '',
    roleId: '',
    sex: '',
    agentId: '',
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onFilter(filter)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border h-max p-2 flex  flex-col gap-3 rounded-[3px] flex-shrink-0 min-w-[300px] "
    >
      <h5 className="font-semibold text-sm flex items-center gap-1">
        User Manager <ShieldQuestionIcon className="w-[12px]" />
      </h5>

      <div className="h-[1px] bg-gray-200"></div>

      <div className="flex text-[12px] font-semibold items-center border border-gray-200 px-2">
        <Search className="w-[1rem]" />
        <Input
          type="text"
          onChange={(e) => {
            setFilter({ ...filter, search: e.target.value })
          }}
          placeholder="...email or username"
          className="h-fit focus-visible:ring-0 border-none shadow-none placeholder:text-[12px] text-[12px]"
        />
      </div>

      <div className="my-2">
        <Badge>Roles</Badge>
        <Select
          onValueChange={(value) => {
            setFilter({ ...filter, roleId: value })
          }}
        >
          <SelectTrigger className="mt-1 text-[12px] h-6">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent className="text-[12px]">
            <SelectGroup>
              <SelectLabel className="text-[12px]">roles</SelectLabel>
              {roles.map((role) => (
                <SelectItem
                  className="text-[12px]"
                  key={role._id}
                  value={role._id}
                >
                  {role.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2">
        <Badge variant={'success'}>Agents</Badge>
        <Select
          onValueChange={(value) => {
            setFilter({ ...filter, agentId: value })
          }}
        >
          <SelectTrigger className="mt-1 text-[12px] h-6">
            <SelectValue placeholder="Select a agents" />
          </SelectTrigger>
          <SelectContent className="text-[12px]">
            <SelectGroup>
              <SelectLabel className="text-[12px]">Agents</SelectLabel>
              {agents.map((agent) => (
                <SelectItem
                  className="text-[12px]"
                  key={agent._id}
                  value={agent._id}
                >
                  {agent.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="my-2">
        <Badge variant={'secondary'} className="bg-gray-700/10">
          sex
        </Badge>
        <Select
          onValueChange={(value) => {
            setFilter({ ...filter, sex: value })
          }}
        >
          <SelectTrigger className="mt-1 text-[12px] h-6">
            <SelectValue placeholder="Select a sex" />
          </SelectTrigger>
          <SelectContent className="text-[12px]">
            <SelectGroup>
              <SelectLabel className="text-[12px]">select sex</SelectLabel>
              <SelectItem className="text-[12px]" value={'male'}>
                male
              </SelectItem>
              <SelectItem className="text-[12px]" value={'female'}>
                female
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size={'mini'}
            variant={'outline'}
            className="flex gap-1 items-center mt-2 w-12 "
          >
            clear
          </Button>

          <Button
            type="submit"
            size={'mini'}
            className="flex gap-1 items-center mt-2"
          >
            <Search className="w-[12px]" />
            filter
          </Button>
        </div>
      </div>
    </form>
  )
}

export default BoxFilter
