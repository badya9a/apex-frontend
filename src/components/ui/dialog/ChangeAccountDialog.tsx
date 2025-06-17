import { useState, type FC } from 'react'
import { Button } from '../button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../dropdown-menu'
import { Input } from '../input'
import { Label } from '../label'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AccountsService } from '@/services/accounts.service'

const ChangeAccountDialog: FC<{ id: number; defaultValue: string }> = ({
	defaultValue,
	id,
}) => {
	const [desc, setDesc] = useState(defaultValue)

	const { mutate: deleteAccount } = useMutation({
		mutationKey: ['delete account'],
		mutationFn: (id: number) => AccountsService.deleteById(id),
	})

	const queryClient = useQueryClient()

	const { mutate: editAccount, isPending } = useMutation({
		mutationKey: ['edit account'],
		mutationFn: ({ description, id }: { id: number; description: string }) =>
			AccountsService.editAccount(id, description),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get all accounts'] })
		},
	})

	const handleSubmit = () => {
		editAccount({ id, description: desc! })
	}
	return (
		<Dialog onOpenChange={() => setDesc('')}>
			<DropdownMenu>
				<DropdownMenuTrigger className="hover:cursor-pointer outline-none">
					Open
				</DropdownMenuTrigger>
				<DropdownMenuContent className="flex flex-col bg-black text-white gap-2">
					<DropdownMenuItem
						className="hover:cursor-pointer hover:bg-red-500"
						onClick={() => deleteAccount(id)}
					>
						Delete
					</DropdownMenuItem>
					<DialogTrigger asChild>
						<DropdownMenuItem className="hover:cursor-pointer hover:bg-red-500">
							Edit account
						</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<form>
				<DialogContent className="sm:max-w-[425px] bg-gray-500">
					<DialogHeader>
						<DialogTitle>Edit account name</DialogTitle>
						<DialogDescription>
							Chenge account name here. Click save when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							defaultValue={defaultValue}
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
							className="col-span-2 h-8 outline-none border-none"
						/>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button
							disabled={isPending}
							type="submit"
							className="hover:cursor-pointer"
							onClick={handleSubmit}
						>
							Save changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	)
}
export default ChangeAccountDialog
