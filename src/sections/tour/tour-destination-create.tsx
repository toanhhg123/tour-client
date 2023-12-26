'use client'
import Loader from '@/components/loader'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import useFetch from '@/hooks/useFetch'
import { cn, showToastError, showToastSuccess } from '@/lib/utils'
import { createTourDestination } from '@/services/tour'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeftIcon, Save } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const TourDestinationCreate = () => {
  const [status, fetch] = useFetch()

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', description: '' },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (status.loading) return

    const { data, error } = await fetch(() => createTourDestination(values))
    if (error) showToastError(error)
    if (data) {
      showToastSuccess('create tour destination success')
      router.push(`/tours/destination`)
    }
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <Card className=" relative border-none">
          {status.loading && <Loader />}
          <CardHeader>
            <h3 className=" text-lg font-semibold">
              From Create Tour Destination
            </h3>
            <p className="text-sm text-gray-500">
              Please fill in all fields below
            </p>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={'please enter name tour'}
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name={'description'}
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col mt-8 relative">
                    <FormLabel>Description Tour Destination</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="please not tour destination"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-between">
              <Link
                href={'/tours'}
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                  }),
                  'flex items-center gap-1',
                )}
              >
                <ArrowLeftIcon className="w-[14px]" />
                Back
              </Link>
              <Button
                type="submit"
                className="flex items-center gap-1 relative"
              >
                <Save className="w-[14px]" />
                Save
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Form>
    </form>
  )
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  description: z.string().optional(),
})

export default TourDestinationCreate
