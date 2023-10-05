'use client'
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
import {
  createAgentThunk,
  getAgentsThunk,
  updateAgentThunk,
} from '@/features/user/actions'
import { AgentCreate, IAgent, initAgentCreate } from '@/features/user/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import FormAgent from './FormAgent'
import CardAgent from './cardAgent'

export default function Page() {
  const { agents } = useAppSelector((state) => state.user)
  const { dispatchAsyncThunk } = useDispatchAsync()
  const [sheet, setSheet] = useState<{
    type?: 'edit' | 'create' | 'delete'
    curForm?: AgentCreate
    curData?: IAgent
  }>({})

  const handleSave = async (agent: AgentCreate) => {
    const { type, curData } = sheet
    if (type === 'create') {
      await dispatchAsyncThunk(createAgentThunk(agent), 'success')
    }

    if (type === 'edit' && curData) {
      await dispatchAsyncThunk(
        updateAgentThunk({ id: curData._id, agent }),
        'success',
      )
    }
    setSheet({})
  }

  const hanldeEdit = ({ _id, ...agent }: IAgent): void => {
    setSheet({
      type: 'edit',
      curForm: agent,
      curData: { _id, ...agent },
    })
  }

  useEffect(() => {
    dispatchAsyncThunk(getAgentsThunk())
  }, [dispatchAsyncThunk])

  return (
    <PrivateRoute>
      <div className="w-full relative flex flex-col items-start md:flex-row md:items-center justify-between">
        <h3 className="text-1xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
          Danh sách Agent
        </h3>

        <div className="flex align-middle gap-2">
          <Button
            variant={'outline'}
            size={'sm'}
            onClick={() => dispatchAsyncThunk(getAgentsThunk(), 'success')}
          >
            <ReloadIcon className="me-2" />
            Reload
          </Button>

          <Sheet
            open={sheet?.type === 'create' || sheet?.type === 'edit'}
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
                    curForm: initAgentCreate,
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
                <SheetTitle>Thêm một Agent</SheetTitle>
                <SheetDescription>
                  Vui lòng nhập vào các mục bên dưới !!
                </SheetDescription>
              </SheetHeader>
              {sheet?.curForm && (
                <FormAgent initData={sheet.curForm} onSave={handleSave} />
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="flex flex-wrap mt-5 gap-2">
        {agents.map((agent) => (
          <CardAgent onClickEdit={hanldeEdit} key={agent._id} agent={agent} />
        ))}
      </div>
    </PrivateRoute>
  )
}
