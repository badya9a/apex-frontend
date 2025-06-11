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
import { useEffect, useState, type FC } from 'react'
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip'
import { Tooltip } from '../tooltip'

export const Picker: FC<{
	picked: { fullName: string; id: number; companyName: string }
	setPicked: React.Dispatch<
		React.SetStateAction<{ fullName: string; id: number; companyName: string }>
	>
	placeholder: string
	dataToPick: { fullName: string; id: number; companyName: string }[]
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
							? dataToPick.find((s) => s.id === picked.id)?.fullName
							: placeholder}
						<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
			</div>
			<PopoverContent className="w-[200px] p-0 bg-gray-300">
				<Command>
					<CommandInput placeholder={placeholder} className="h-9" />
					<CommandList>
						<CommandEmpty>Not found.</CommandEmpty>
						<CommandGroup>
							{dataToPick?.map((pick) => (
								<CommandItem
									key={pick.id}
									value={pick.fullName}
									onSelect={(currentValue) => {
										if (picked) {
											setPicked(
												currentValue === picked.fullName ? picked : pick
											)
										} else {
											setPicked(pick)
										}
										setOpen(false)
									}}
								>
									<CheckIcon
										className={cn(
											'mr-2 h-4 w-4',
											picked
												? dataToPick?.filter((p) => pick.id === picked.id)
														.length
													? 'opacity-100'
													: 'opacity-0'
												: 'opacity-0'
										)}
									/>
									{pick.companyName} {pick.fullName}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
