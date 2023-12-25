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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { URL_AUTH_API, URL_TOUR_API } from '@/config/axios'
import { TourDestination, initTour } from '@/features/tour/type'
import { IUser } from '@/features/user/type'
import useAxios from '@/hooks/useAxios'
import useFetch from '@/hooks/useFetch'
import { cn, showToastError, showToastSuccess } from '@/lib/utils'
import { createTour } from '@/services/tour'
import { zodResolver } from '@hookform/resolvers/zod'
import _ from 'lodash'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const Page = () => {
  const [status, fetch] = useFetch()
  const { data: tourGuides } = useAxios<IUser[]>({
    baseURL: URL_AUTH_API + '/user/getTourGuideInOperator',
  })
  const { data: tourDestinations } = useAxios<TourDestination[]>({
    baseURL: URL_TOUR_API + '/tourDestination/myDestination',
  })

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (status.loading) return

    const { data, error } = await fetch(() =>
      createTour({
        ..._.omit(initTour, '_id'),
        name: values.name,
        tourDes: values.tourDes,
        tourGuide: {
          _id: values.tourGuideId,
        },
      }),
    )
    if (error) showToastError(error)
    if (data) {
      showToastSuccess('create tour success')
      router.push(`/tours/${data.data.element._id}`)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <Card className=" relative border-none">
          {status.loading && <Loader />}
          <CardHeader>
            <h3 className=" text-lg font-semibold">From Create Tour</h3>
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
                    <FormLabel className="font-normal">Name</FormLabel>
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
              name={'tourGuideId'}
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col mt-6 relative">
                    {!tourGuides && <Loader />}
                    <FormLabel className="font-normal">
                      Select Tour Guide
                    </FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="select tour guide..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tourGuides &&
                            tourGuides.map((user) => (
                              <SelectItem value={user._id} key={user._id}>
                                {user.email}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name={'tourDes'}
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col mt-6 relative">
                    {!tourDestinations && <Loader />}
                    <FormLabel className="font-normal">
                      Select Tour Destination
                    </FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="select tour destination..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tourDestinations &&
                            tourDestinations.map((des) => (
                              <SelectItem value={des._id} key={des._id}>
                                {des.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
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
                Next
                <ArrowRightIcon className="w-[14px]" />
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
  tourGuideId: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  tourDes: z.string().min(1, { message: 'không được bỏ trống phần này' }),
})

export default Page
