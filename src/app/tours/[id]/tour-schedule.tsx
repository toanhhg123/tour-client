'use client'
import FormFieldText from '@/components/form-field-text'
import FormFieldTextEditor from '@/components/form-field-textEditor'
import CreateTourSchedule from '@/components/tour/create-tour-schedule'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { ITour } from '@/features/tour/type'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface Props {
  tour: ITour
}

const FormTourSchedule = ({ tour }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <h3 className="font-bold text-gray-600">List Tour Schedule</h3>
        <CreateTourSchedule />
      </div>

      <form
        onSubmit={form.handleSubmit((value) => {
          console.log(value)
        })}
      >
        <Form {...form}>
          <Card>
            <CardHeader className="text-gray-500 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold ">Schedule Tours</h3>
                  <span className="text-sm font-medium">
                    update tour schedule
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-8 pt-8">
              <FormFieldText name="title" label="Title" form={form} />
              <FormFieldTextEditor name="content" form={form} label="Content" />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </Card>
        </Form>
      </form>
    </div>
  )
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  content: z.string().optional(),
})

export default FormTourSchedule
