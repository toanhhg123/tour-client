import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ITour } from '@/features/tour/type'
import { convertToVnd } from '@/utils'
import format from 'date-fns/format'
import {
  Bed,
  CreditCard,
  DollarSignIcon,
  MailIcon,
  Plane,
  PlaneLanding,
  ShieldQuestionIcon,
  Star,
  Timer,
  TimerReset,
  TrafficCone,
} from 'lucide-react'
import Link from 'next/link'

type Props = {
  tour: ITour
}

const CardTourAccordion = ({ tour }: Props) => {
  return (
    <div className="border p-2 flex  flex-col gap-3 border-gray-200 rounded-[3px] flex-shrink-0 min-w-[300px] ">
      <h5 className="font-semibold text-sm flex items-center gap-1">
        Tour infomation <ShieldQuestionIcon className="w-[12px]" />
      </h5>

      <div className="h-[1px] bg-gray-200"></div>

      <div className="flex text-[12px] font-semibold justify-between items-center">
        <span>name</span>
        <Link
          href={tour.programLink}
          target="_blank"
          className="flex underline text-blue-500 font-semibold gap-1 text-sm items-center"
        >
          <Star className="w-[1rem]" /> {tour.name}
        </Link>
      </div>

      <div className="flex justify-between font-semibold text-[12px]">
        <span className="flex items-center gap-1">
          <Timer className="w-[14px]" /> Go Date:
        </span>
        <span className="text-gray-500">
          {format(new Date(tour.goDate), 'dd/MM/yyyy')}
        </span>
      </div>
      <div className="flex justify-between font-semibold text-[12px]">
        <span className="flex items-center gap-1">
          <TimerReset className="w-[14px]" /> Return Date:
        </span>
        <span className="text-gray-500">
          {format(new Date(tour.returnDate), 'dd/MM/yyyy')}
        </span>
      </div>

      <div className="flex justify-between font-semibold text-[12px]">
        <span className="flex items-center gap-1">
          <Bed className="w-[14px]" /> Daration:
        </span>
        <span className="text-gray-500">{tour.duration}</span>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-2">
          <AccordionTrigger>Manager & Guide ?</AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between font-semibold text-[12px]">
              <span className="flex items-center gap-1">
                <MailIcon className="w-[12px]" />
                Tour Manager:
              </span>
              <span className="text-gray-500">
                <span className="text-gray-500">{tour.tourMan?.email}</span>
              </span>
            </div>

            <div className="flex justify-between font-semibold text-[12px]">
              <span className="flex items-center gap-1">
                <MailIcon className="w-[12px]" />
                Tour Guide:
              </span>
              <span className="text-gray-500">
                <span className="text-gray-500">{tour.tourGuide?.email}</span>
              </span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Transport ?</AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between font-semibold text-[12px]">
              <span className="flex items-center gap-1">
                <Plane className="w-[12px]" />
                Go Fight:
              </span>
              <span className="text-gray-500">
                <span className="text-gray-500">{tour.goFlight}</span>
              </span>
            </div>

            <div className="flex justify-between font-semibold text-[12px]">
              <span className="flex items-center gap-1">
                <PlaneLanding className="w-[12px]" />
                Return Fight:
              </span>
              <span className="text-gray-500">
                <span className="text-gray-500">{tour.returnFlight}</span>
              </span>
            </div>

            <div className="flex justify-between font-semibold text-[12px]">
              <span className="flex items-center gap-1">
                <TrafficCone className="w-[12px]" />
                Transport Name:
              </span>
              <span className="text-gray-500">
                <span className="text-gray-500">{tour.transport}</span>
              </span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Other ?</AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between font-semibold text-[12px]">
              <span className="flex items-center gap-1">
                <CreditCard className="w-[12px]" />
                Visa Date
              </span>
              <span className="text-gray-500">
                <span className="text-gray-500">
                  {format(new Date(tour.visaDate), 'dd/MM/yyyy')}
                </span>
              </span>
            </div>

            <div className="flex justify-between font-semibold text-[12px]">
              <span className="flex items-center gap-1">
                <DollarSignIcon className="w-[12px]" />
                commision:
              </span>
              <span className="text-gray-500">
                <span className="text-gray-500">
                  {convertToVnd(tour.commision)}
                </span>
              </span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default CardTourAccordion
