'use client'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

import { Client, ClientType, EClassification } from '@/features/booking/type'

import * as React from 'react'
import { CaretSortIcon } from '@radix-ui/react-icons'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'

import { Separator } from '@/components/ui/separator'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    Form
} from '@/components/ui/form'

import FormFieldSelect from '@/components/form-field-select'
import FormFieldText from '@/components/form-field-text'
import FormFieldDate from '@/components/FormFieldDate'
import FormFieldTextArea from '@/components/form-field-textarea'

interface Props {
    editData: Client
    onSave: (id: string, body: any) => void
    isOpen: boolean
}

const formSchema = z.object({
    name: z.string().min(1, { message: "Please enter your name" }),
    email: z.string().optional(),
    phone: z.string().optional(),
    type: z.string(),
    note: z.string().optional(),
    commonName: z.string().optional(),
    dob: z.date().optional(),
    linkProfile: z.string().optional(),
    address: z.string().optional(),
    classification: z.string().optional(),
    updatedAt: z.date().optional(),
})

export function UpdateClient({ editData, onSave, isOpen }: Props) {
    console.log(editData)
    // Collapse State
    const [isCollapseOpen, setIsCollapseOpen] = React.useState(false)

    const [isDiaglogOpen, setIsDialogOpen] = React.useState(isOpen)

    type TypeSelectItem = { _id: string; value: ClientType };

    const mapToSelectItem = (type: any): TypeSelectItem => ({
        _id: type,
        value: type,
    });

    const clientTypes: TypeSelectItem[] = Object.values(ClientType).map(mapToSelectItem);

    const classifications: TypeSelectItem[] = Object.values(EClassification).map(mapToSelectItem);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:
        {
            ...editData,
            updatedAt: new Date,
            dob: editData.dob ? new Date(editData.dob) : undefined
        },
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        onSave(editData._id, values as Omit<Client, '_id' | 'operatorId' | 'userCreatedId' | 'createdAt'>)
        setIsDialogOpen(false)
    }

    return (
        <>
            <Dialog open={isDiaglogOpen} onOpenChange={() => setIsDialogOpen(!isDiaglogOpen)}>
                <DialogContent className="max-h-full lg:max-w-screen-lg overflow-y-scroll">
                    <DialogHeader>
                        <DialogTitle>Edit customer</DialogTitle>
                    </DialogHeader>
                    <Separator />
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <Form {...form}>

                            <FormFieldSelect form={form} label='Customer Type' name='type' selects={clientTypes} />

                            <FormFieldText form={form} label='Full Name' name='name' />

                            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
                                <FormFieldText form={form} label='Phone Number' name='phone' />

                                <FormFieldText form={form} label='Email' name='email' />
                            </div>

                            <FormFieldTextArea form={form} label='Note' name='note' />

                            <Collapsible
                                open={isCollapseOpen}
                                onOpenChange={setIsCollapseOpen}
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

                                    <FormFieldText form={form} label='Common name' name='commonName' />

                                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
                                        <FormFieldDate form={form} label='Date of birth' name='dob' />

                                        <FormFieldSelect form={form} label='Classification' name='classification' selects={classifications} />
                                    </div>

                                    <FormFieldText form={form} label='Link Profile' name='linkProfile' />

                                    <FormFieldText form={form} label='Address' name='address' />

                                </CollapsibleContent>
                            </Collapsible>

                            <Button className="float-right" type="submit">
                                Save changes
                            </Button>
                        </Form>
                    </form>
                </DialogContent>
            </Dialog >
        </>
    )
}