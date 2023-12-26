'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import {
  sources,
  caseworkers,
  companies,
  ranks,
  customerTypes,
  countries,
  cities,
} from './fake-data'

import * as React from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

import {
  PlusCircle,
  User,
  UserCheck2,
  Building2,
  CalendarIcon,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'

export function AddNewClient() {
  const [open, setOpen] = React.useState(false)

  const [caseworkerOpen, setCaseworkerOpen] = React.useState(false)

  const [isOpen, setIsOpen] = React.useState(false)

  const [cityOpen, setCityOpen] = React.useState(false)

  const [countryOpen, setCountryOpen] = React.useState(false)

  var options = [
    { value: 'LEAD', label: 'LEAD', icon: User },
    { value: 'CUSTOMER', label: 'CUSTOMER', icon: UserCheck2 },
  ]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupCustomer: 'LEAD',
      company: '',
      pronoun: 'Mr',
      fullname: '',
      phoneNumber: '',
      email: '',
      referrer: '',
      caseworker: '',
      rank: '',
      customerType: '',
      dateOfBirth: new Date(),
      facebook: '',
      country: '',
      city: '',
      address: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8 mx-2 px-2 lg:px-3">
          {' '}
          Add new
          <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add new customer</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Group customer */}
            <FormField
              control={form.control}
              name="groupCustomer"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Group customer</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-5"
                    >
                      {options &&
                        options.map((option) => (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <FormLabel className="font-medium">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="flex justify-between flex-1 flex-col">
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="justify-between h-9"
                        >
                          {field.value
                            ? companies.find(
                                (company) => company.id === field.value,
                              )?.name
                            : 'Select company...'}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search company..."
                            className="h-9"
                          />
                          <CommandEmpty>No company found.</CommandEmpty>
                          <CommandGroup>
                            {companies.map((company) => (
                              <CommandItem
                                key={company.id}
                                value={company.id}
                                onSelect={(currentValue) => {
                                  field.onChange(
                                    currentValue === field.value
                                      ? ''
                                      : currentValue,
                                  )
                                  setOpen(false)
                                }}
                              >
                                <div className="flex items-center gap-3">
                                  <Building2
                                    className={cn('ml-auto h-4 w-4')}
                                  />
                                  <div>
                                    <p className="font-medium">
                                      {' '}
                                      {company.name}
                                    </p>
                                    <p> {company.addres}</p>
                                  </div>
                                </div>
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    field.value === company.id
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* End group customer */}
            <Separator className="my-4" />

            {/* Content */}
            <Label>BOOKER INFORMATION</Label>
            <FormField
              control={form.control}
              name="pronoun"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      defaultValue={field.value}
                      className="flex space-x-5"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Mr" id="r1" />
                        <Label htmlFor="r1">Mr</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Mrs" id="r2" />
                        <Label htmlFor="r2">Mrs</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-10">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex space-x-10">
              <FormField
                control={form.control}
                name="referrer"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Referrer</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="-- Select --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="null">-- Select --</SelectItem>
                          {sources &&
                            sources.map((option) => (
                              <SelectItem value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="caseworker"
                render={({ field }) => (
                  <FormItem className="flex justify-between flex-1 flex-col">
                    <FormLabel>Caseworker</FormLabel>
                    <FormControl>
                      <Popover
                        open={caseworkerOpen}
                        onOpenChange={setCaseworkerOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="justify-between h-9"
                          >
                            {field.value
                              ? caseworkers.find(
                                  (caseworker) =>
                                    caseworker.value === field.value,
                                )?.name
                              : '-- Select --'}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search caseworker..."
                              className="h-9"
                            />
                            <CommandEmpty>No caseworker found.</CommandEmpty>
                            <CommandGroup>
                              {caseworkers.map((caseworker) => (
                                <CommandItem
                                  key={caseworker.value}
                                  value={caseworker.value}
                                  onSelect={(currentValue) => {
                                    field.onChange(
                                      currentValue === field.value
                                        ? ''
                                        : currentValue,
                                    )
                                    setCaseworkerOpen(false)
                                  }}
                                >
                                  <div>
                                    <p className="font-medium">
                                      {caseworker.name}
                                    </p>
                                    <p>{caseworker.email}</p>
                                  </div>

                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      field.value === caseworker.value
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/*End Content */}

            {/* Extend Section */}

            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-full space-y-4"
            >
              <div className="flex justify-center space-x-4 px-4">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-blue-500 w-auto"
                    size="sm"
                  >
                    <h4 className="text-sm font-semibold">Expand</h4>
                    <CaretSortIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="space-y-2">
                {/* Phân hạng & Loại khách */}
                <div className="flex space-x-10">
                  <FormField
                    control={form.control}
                    name="rank"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Rank</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="-- Select --" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="null">-- Select --</SelectItem>
                              {ranks &&
                                ranks.map((rank) => (
                                  <SelectItem value={rank.value}>
                                    {rank.label}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerType"
                    render={({ field }) => (
                      <FormItem className="flex justify-between flex-1 flex-col">
                        <FormLabel>Customer type</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder="-- Select --"
                                defaultValue={field.value}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="null">-- Select --</SelectItem>
                              {customerTypes &&
                                customerTypes.map((data) => (
                                  <SelectItem
                                    key={data.value}
                                    value={data.value}
                                  >
                                    {data.label}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Sinh nhật && Link FB */}
                <div className="flex space-x-10">
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Date of birth</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full justify-start text-left font-normal',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                  field.onChange(date)
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem className="flex justify-between flex-1 flex-col">
                        <FormLabel>Facebook link</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your facebook link"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Quốc gia && Thành phố */}
                <div className="flex space-x-10">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Popover
                            open={countryOpen}
                            onOpenChange={setCountryOpen}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                              >
                                {field.value
                                  ? countries.find(
                                      (country) =>
                                        country.value === field.value,
                                    )?.label
                                  : 'Select country...'}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search country..."
                                  className="h-9"
                                />
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup>
                                  {countries.map((country) => (
                                    <CommandItem
                                      key={country.value}
                                      value={country.value}
                                      onSelect={(currentValue) => {
                                        field.onChange(
                                          currentValue == field.value
                                            ? ''
                                            : currentValue,
                                        )
                                        setOpen(false)
                                      }}
                                    >
                                      {country.label}
                                      <CheckIcon
                                        className={cn(
                                          'ml-auto h-4 w-4',
                                          field.value === country.value
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="flex justify-between flex-1 flex-col">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Popover open={cityOpen} onOpenChange={setCityOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="justify-between h-9"
                              >
                                {field.value
                                  ? cities.find(
                                      (city) => city.value === field.value,
                                    )?.value
                                  : '-- Select --'}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search city..."
                                  className="h-9"
                                />
                                <CommandEmpty>No city found.</CommandEmpty>
                                <CommandGroup>
                                  {cities.map((city) => (
                                    <CommandItem
                                      key={city.value}
                                      value={city.value}
                                      onSelect={(currentValue) => {
                                        field.onChange(
                                          currentValue === field.value
                                            ? ''
                                            : currentValue,
                                        )
                                        setCityOpen(false)
                                      }}
                                    >
                                      {city.label}
                                      <CheckIcon
                                        className={cn(
                                          'ml-auto h-4 w-4',
                                          field.value === city.value
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="flex justify-between flex-1 flex-col">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CollapsibleContent>
            </Collapsible>
            {/*End Extend Section */}

            <Button className="float-right" type="submit">
              Create customer
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const formSchema = z.object({
  groupCustomer: z.string(),
  company: z.string(),
  pronoun: z.string(),
  fullname: z.string().min(2).max(50),
  phoneNumber: z.string(),
  email: z.string().email(),
  referrer: z.string(),
  caseworker: z.string(),
  rank: z.string(),
  customerType: z.string(),
  dateOfBirth: z.date(),
  facebook: z.string(),
  country: z.string(),
  city: z.string(),
  address: z.string(),
})
