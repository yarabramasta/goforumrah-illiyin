'use client'

import { Calendar, DoorClosed, Moon } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export interface ReservationItemProps {
  name: string
  bookingId: string
  totalSpent: number
  totalNight: number
  totalBedroom: number
  bookedAt: string
  stayDate: string
  stayTime: string
}

export default function ReservationItem(
  props: ReservationItemProps & {
    variant: 'list-item' | 'card'
  }
) {
  if (props.variant === 'list-item') {
    return (
      <div className="flex w-full px-4 py-6">
        <Avatar className="mr-6 size-10 rounded-md border">
          <AvatarImage
            src={`https://api.dicebear.com/8.x/notionists-neutral/svg?seed=${props.name}`}
          ></AvatarImage>
        </Avatar>
        <div className="flex w-full gap-8 text-xs">
          <div className="flex flex-col">
            <h2 className="mb-1.5 text-lg font-medium leading-tight">
              {props.name}
            </h2>
            <div className="flex w-full items-center text-gray-600">
              <span className="mr-2">#{props.bookingId}</span>
              <Moon className="mr-1 h-4 w-4" />
              <span className="mr-2">{props.totalNight} Nights</span>
              <DoorClosed className="mr-1 h-4 w-4" />
              <span className="mr-2">{props.totalBedroom} Bedrooms</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-1.5 flex items-center text-sm font-medium leading-tight">
              <Calendar className="mr-1 h-4 w-4" />
              Booked at {props.bookedAt}
            </div>
            <p className="mt-1 flex-wrap text-gray-600">
              Stay date {props.stayDate}
              <br />
              {props.stayTime}
            </p>
          </div>
          <span className="text-lg font-medium leading-tight">
            Total spent: ${props.totalSpent}
          </span>
          <Link
            href="#"
            className="text-sm font-medium text-primary hover:underline"
          >
            Detail order
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="mb-2 flex flex-col">
            <span className="mb-1 text-xs font-normal leading-tight text-muted-foreground">
              #{props.bookingId}
            </span>
            <span className="text-primary">{props.name}</span>
          </div>
        </CardTitle>
        <CardDescription>
          <div className="flex w-full flex-col gap-1 text-xs text-gray-800">
            <div className="flex items-center">
              <Moon className="mr-1 h-3 w-3" />
              <span>{props.totalNight} Nights</span>
            </div>
            <div className="flex items-center">
              <DoorClosed className="mr-1 h-3 w-3" />
              <span>{props.totalBedroom} Bedrooms</span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs leading-tight text-muted-foreground">
          This reservation was booked at {props.bookedAt} and the stay date is
          on {props.stayDate} at {props.stayTime}.
        </p>
      </CardContent>
      <CardFooter className="font-medium">
        Total spent: ${props.totalSpent}
      </CardFooter>
    </Card>
  )
}
