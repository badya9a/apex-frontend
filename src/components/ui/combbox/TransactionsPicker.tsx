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
import { useState, type FC } from 'react'

export const TransactionsPicker: FC<{
	picked: { id: number; name: string }
	setPicked: React.Dispatch<React.SetStateAction<{ id: number; name: string }>>
	placeholder: string
	dataToPick: { id: number; name: string }[]
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
							? dataToPick.find((s) => s.id === picked.id)?.name
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
									value={pick.name}
									onSelect={(currentValue) => {
										if (picked) {
											setPicked(currentValue === picked.name ? picked : pick)
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
