'use client'

import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

const DatePicker: React.FC<{
	date: Date | null
	setDate: React.Dispatch<React.SetStateAction<Date | null>>
	label: string
}> = ({ date, setDate, label }) => {
	const [open, setOpen] = React.useState(false)

	return (
		<div className="flex flex-col gap-3 ">
			<Label htmlFor="date" className="px-1">
				{label}
			</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-48 justify-between font-normal"
					>
						{date !== null ? date.toLocaleDateString() : 'Select date'}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-auto overflow-hidden p-0 bg-white"
					align="start"
				>
					<Calendar
						mode="single"
						selected={date !== null ? date : undefined}
						captionLayout="dropdown"
						onSelect={(date) => {
							setDate(date !== undefined ? date : null)
							setOpen(false)
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default DatePicker
