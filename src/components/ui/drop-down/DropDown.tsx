import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { FC } from 'react'
import ChangeRolesDialog from '../dialog/ChangeRolesDialog'
import type { IUser } from '@/shared/types/user.types'

const DropDown: FC<{ user: IUser }> = ({ user }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="hover:cursor-pointer outline-none">
				Open
			</DropdownMenuTrigger>
			<DropdownMenuContent className="flex flex-col bg-black text-white gap-2">
				<DropdownMenuItem className="hover:cursor-pointer hover:bg-red-500">
					Reset password
				</DropdownMenuItem>
				<DropdownMenuItem className="hover:cursor-pointer hover:bg-red-500"></DropdownMenuItem>
				<DropdownMenuItem className="hover:cursor-pointer hover:bg-red-500">
					Edit user
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
export default DropDown
