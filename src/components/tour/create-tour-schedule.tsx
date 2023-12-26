'use client'
import { Button } from '@/components/ui/button'
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import { PlusCircleIcon } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form } from '../ui/form'
import FormFieldText from '../form-field-text'
import FormFieldTextEditor from '../form-field-textEditor'
import { useState } from 'react'

const CreateTourSchedule = () => {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="my-4">
          <PlusCircleIcon className="mr-2 w-4" />
          New Schedule
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:min-w-[600px]">
        <form
          onSubmit={form.handleSubmit((value) => {
            console.log(value)
          })}
        >
          <Form {...form}>
            <AlertDialogHeader>
              <AlertDialogTitle>New schedule</AlertDialogTitle>
              <AlertDialogDescription>
                Make new schedule to tour here. Click save when you are done.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex flex-col gap-8 my-8">
              <FormFieldText name="title" label="Title" form={form} />
              <FormFieldTextEditor name="content" form={form} label="Content" />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>
                <Button variant={'outline'} type="button">
                  Cancel
                </Button>
              </AlertDialogCancel>
              <Button type="submit">Save changes</Button>
            </AlertDialogFooter>
          </Form>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  content: z.string().optional(),
})

export default CreateTourSchedule
