'use client'
import { Button } from '@/components/ui/button'
import PrivateRoute from '@/context/PrivateRouteContext'
import {
  createSupplierThunk,
  getSuppliersThunk,
  updateSupplierThunk,
} from '@/features/user/actions'
import { Supplier, SupplierForm, initSupplierForm } from '@/features/user/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import BoxFilter, { Filter } from '@/sections/supplier/box-filter'
import CardSupllier from '@/sections/supplier/card-supplier'
import FormSupplier from '@/sections/supplier/form'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import { PenLine, Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import _ from 'lodash'

const Page = () => {
  const { suppliers } = useAppSelector((state) => state.user)
  const [supplierView, setSupplierView] = useState(suppliers)
  const { dispatchAsyncThunk } = useDispatchAsync()
  const [sheet, setSheet] = useState<{
    type?: 'create' | 'edit'
    curSupplier?: Supplier
    supplierForm?: SupplierForm
  }>({})

  const handleReload = () => {
    dispatchAsyncThunk(getSuppliersThunk(), 'success')
  }

  const handleFilter = ({ search }: Filter) => {
    setSupplierView(
      suppliers.filter(
        (supplier) =>
          supplier.email.match(search) || supplier.name.match(search),
      ),
    )
  }

  const handleSubmitForm = (_supplierForm: SupplierForm) => {
    const { type, curSupplier } = sheet
    if (type === 'create')
      return dispatchAsyncThunk(
        createSupplierThunk(_supplierForm),
        'success',
        () => setSheet({}),
      )

    if (type === 'edit' && curSupplier)
      return dispatchAsyncThunk(
        updateSupplierThunk({ id: curSupplier._id, body: _supplierForm }),
        'success',
        () => setSheet({}),
      )
  }

  useEffect(() => {
    dispatchAsyncThunk(getSuppliersThunk())
  }, [dispatchAsyncThunk])

  useEffect(() => {
    setSupplierView(suppliers)
  }, [suppliers])

  return (
    <PrivateRoute roles={['Manager', 'Oper.Admin']}>
      <div className="w-full text-gray-700  flex flex-wrap  justify-between gap-2">
        <BoxFilter onClear={handleReload} onFilter={handleFilter} />
        <div className="flex-1">
          <div className="flex gap-1">
            <Button variant={'outline'} size={'mini'} onClick={handleReload}>
              <ReloadIcon className="w-[12px] mr-1" /> reload
            </Button>

            <Button
              onClick={() => {
                setSheet({ type: 'create', supplierForm: initSupplierForm })
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

                  {['create', 'edit'].includes(sheet.type) &&
                    sheet.supplierForm && (
                      <FormSupplier
                        initData={sheet.supplierForm}
                        handleSubmit={handleSubmitForm}
                      />
                    )}
                </div>
              </>
            ) : (
              <>
                {supplierView.map((supplier) => (
                  <CardSupllier
                    supplier={supplier}
                    key={supplier._id}
                    renderAction={(supplier) => {
                      return (
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            onClick={() => {
                              setSheet({
                                type: 'edit',
                                supplierForm: _.omit(
                                  supplier,
                                  '_id',
                                  'operId',
                                  'createdAt',
                                  'updatedAt',
                                ),
                                curSupplier: supplier,
                              })
                            }}
                            size={'mini'}
                            variant={'outLineSuccess'}
                          >
                            <PenLine className="w-[12px] mr-1" />
                            edit
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
