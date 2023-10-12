'use client'
import { Empty } from '@/components/empty'
import { Button, buttonVariants } from '@/components/ui/button'
import PrivateRoute from '@/context/PrivateRouteContext'
import { getAgentsThunk } from '@/features/user/actions'
import { IAgent } from '@/features/user/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import BoxFilter, { Filter } from '@/sections/agent-operSales/box-filter'
import CardAgent from '@/sections/agent-operSales/card-agent'
import BookingsAgent from '@/sections/agent/bookings-agent'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import { CheckCircleIcon, Users, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Page = () => {
  const { agents } = useAppSelector((state) => state.user)
  const { userDetails } = useAppSelector((state) => state.auth)
  const [agentOfOperSales, setAgentOfOperSales] = useState<IAgent[]>([])
  const [sheet, setSheet] = useState<{
    type?: 'create' | 'edit' | 'bookings' | 'users' | 'update-sales'
    curAgent?: IAgent
  }>({})

  const { dispatchAsyncThunk } = useDispatchAsync()

  const handleReload = () => {
    dispatchAsyncThunk(getAgentsThunk(), 'success')
  }

  const handleFilter = ({ search }: Filter) => {
    let agentOfOperSales = agents.filter(
      (agent) => agent.operSaleId === userDetails?._id,
    )

    if (search)
      agentOfOperSales = agentOfOperSales.filter(
        (agent) => agent.name.match(search) || agent.email.match(search),
      )

    setAgentOfOperSales(agentOfOperSales)
  }

  useEffect(() => {
    dispatchAsyncThunk(getAgentsThunk())
  }, [dispatchAsyncThunk])

  useEffect(() => {
    const agentOfOperSales = agents.filter(
      (agent) => agent.operSaleId === userDetails?._id,
    )
    setAgentOfOperSales(agentOfOperSales)
  }, [agents, userDetails?._id])

  return (
    <PrivateRoute roles={['Oper.Sales']}>
      <div className="w-full text-gray-700  flex flex-wrap  justify-between gap-2">
        <BoxFilter onClear={handleReload} onFilter={handleFilter} />

        <div className="flex-1">
          <div className="flex gap-1">
            <Button variant={'outline'} size={'mini'} onClick={handleReload}>
              <ReloadIcon className="w-[12px] mr-1" /> reload
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
                </div>
              </>
            ) : (
              <>
                {!agentOfOperSales.length && <Empty />}
                {agentOfOperSales.map((agent) => (
                  <CardAgent
                    agent={agent}
                    key={agent._id}
                    renderAction={(agent) => {
                      return (
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <Link
                            href={`/agent-operSales/user/${agent._id}`}
                            className={buttonVariants({
                              size: 'mini',
                              variant: 'outLinePrimary',
                            })}
                          >
                            <Users className="w-[12px] mr-1" />
                            users
                          </Link>

                          <Link
                            href={`/agent-operSales/booking/${agent._id}`}
                            className={buttonVariants({ size: 'mini' })}
                          >
                            <CheckCircleIcon className="w-[12px] mr-1" />
                            bookings
                          </Link>
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
