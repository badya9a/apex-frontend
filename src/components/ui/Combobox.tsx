'use client'

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
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
import { useEffect, useState, type FC } from 'react'
import BsIcon from './BsIcon'
import { Tooltip } from './tooltip'
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip'
import type { availableRoles } from '@/shared/types/user.types'

const rolesData: { role: availableRoles }[] = [
	{ role: 'ADMIN' },
	{ role: 'ACCOUNTANT' },
	{ role: 'VIEWER' },
	{ role: 'USER' },
]

export const Combobox: FC<{
	defaultRoles: { role: availableRoles }[]
	roles: { role: string }[]
	setRoles: React.Dispatch<
		React.SetStateAction<
			{
				role: availableRoles
			}[]
		>
	>
}> = ({ defaultRoles, setRoles, roles }) => {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		setRoles([...defaultRoles])
	}, [])

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<div className="flex gap-4 items-center">
				<div className="flex flex-wrap gap-3">
					{roles.length
						? roles.map((role) => (
								<div className="bg-amber-600 z-10 rounded-2xl py-1 px-2 flex items-center gap-1">
									<Tooltip>
										<TooltipTrigger asChild>
											<button
												className="hover:cursor-pointer"
												onClick={() => {
													setRoles((prev) =>
														prev.filter((r) => r.role !== role.role)
													)
												}}
											>
												<BsIcon name="BsXCircle" color="black" size={18} />
											</button>
										</TooltipTrigger>
										<TooltipContent>
											<p className="bg-amber-100 py-1 px-2 rounded-2xl text-xs">
												Remove role
											</p>
										</TooltipContent>
									</Tooltip>
									{role.role}
								</div>
						  ))
						: null}
				</div>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="justify-start w-fit"
					>
						Select role
						<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
			</div>
			<PopoverContent className="w-[200px] p-0 bg-gray-300">
				<Command>
					<CommandList>
						<CommandEmpty>No framework found.</CommandEmpty>
						<CommandGroup>
							{rolesData.map((r: { role: availableRoles }) => (
								<CommandItem
									key={r.role}
									value={r.role}
									onSelect={() => {
										if (!roles.some((role) => role.role === r.role)) {
											setRoles((prev) => [...prev, r])
										} else {
											setRoles((prev) =>
												prev.filter((role) => role.role !== r.role)
											)
										}
										setOpen(false)
									}}
								>
									<CheckIcon
										className={cn(
											'mr-2 h-4 w-4',
											roles.filter((role) => role.role === r.role).length
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
									{r.role}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
