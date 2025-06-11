'use client'

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip'
import { Tooltip } from '../tooltip'
import { useState, type FC } from 'react'

export const CustomerTypePicker: FC<{
	picked: string
	setPicked: React.Dispatch<
		React.SetStateAction<'CUSTOMER' | 'VENDOR' | 'BOTH'>
	>
	placeholder: string
	dataToPick: { name: 'CUSTOMER' | 'VENDOR' | 'BOTH' }[]
}> = ({ picked, setPicked, placeholder, dataToPick }) => {
	const [open, setOpen] = useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<div className="flex gap-4 items-center">
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="justify-start w-fit"
					>
						{picked
							? dataToPick.find((s) => s.name === picked)?.name
							: placeholder}
						<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
			</div>
			<PopoverContent className="w-[200px] p-0 bg-gray-300">
				<Command>
					<CommandList>
						<CommandEmpty>Not found.</CommandEmpty>
						<CommandGroup>
							{dataToPick.map((pick) => (
								<CommandItem
									key={pick.name}
									value={pick.name}
									onSelect={(currentValue) => {
										if (picked !== currentValue) {
											setPicked(pick.name)
										}
										setOpen(false)
									}}
								>
									{pick.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
