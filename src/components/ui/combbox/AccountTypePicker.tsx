'use client'

import { ChevronsUpDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useState, type FC } from 'react'

export const AccountTypePicker: FC<{
	picked: string
	setPicked: React.Dispatch<React.SetStateAction<string>>
	placeholder: string
	dataToPick: string[]
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
						{picked ? dataToPick.find((s) => s === picked) : placeholder}
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
									key={pick}
									value={pick}
									onSelect={(currentValue) => {
										if (picked !== currentValue) {
											setPicked(pick)
										}
										setOpen(false)
									}}
								>
									{pick}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
