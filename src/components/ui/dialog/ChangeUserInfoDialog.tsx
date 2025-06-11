import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../button'
import AuthFields from '@/components/screens/login/AuthFields'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { UserService } from '@/services/user.service'
import { useState, type FC } from 'react'
import { Combobox } from '../Combobox'
import type { availableRoles } from '@/shared/types/user.types'
import { toast } from 'sonner'

interface IChangeUserInfoDialog {
	id: string
	email: string
	phone: number
	firstName: string
	lastName: string
	roles: typeof availableRoles
}

const ChangeUserInfoDialog: FC<{
	user: IChangeUserInfoDialog
}> = ({ user }) => {
	const {
		register: changeInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<Omit<IChangeUserInfoDialog, 'id'>>({
		defaultValues: {
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			phone: user.phone,
		},
		mode: 'onChange',
	})

	const [formType, setFormType] = useState<'edit' | 'editRoles'>('edit')

	const [roles, setRoles] = useState<{ role: string }[]>([])

	const { mutate, isPending } = useMutation({
		mutationFn: (data: {
			email: string
			firstName: string
			lastName: string
			phone: number
		}) =>
			UserService.changeUsersInfo(user.id, {
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				phone: data.phone,
				roles: roles.map((r) => r.role),
			}),
	})

	const onSubmit: SubmitHandler<Omit<IChangeUserInfoDialog, 'id'>> = ({
		email,
		firstName,
		lastName,
		phone,
	}) => {
		mutate({ email, firstName, lastName, phone })
	}

	const onChangeRolesSubmit: SubmitHandler<{}> = () => {
		changeRoles()
	}

	const { mutate: changeRoles } = useMutation({
		mutationFn: () =>
			UserService.changeUsersRole(
				user.id,
				roles.map((r) => r.role)
			),
		onSuccess: () => {
			toast('Roles changed successfully', {
				duration: 100,
			})
		},
	})

	const { mutate: changePassword } = useMutation({
		mutationFn: () => UserService.resetUserPassword(user.id),
		onSuccess: () => {
			toast('Password changed successfully', {
				duration: 10000,
			})
		},
	})

	return (
		<Dialog onOpenChange={() => reset()}>
			<DropdownMenu>
				<DropdownMenuTrigger className="hover:cursor-pointer outline-none">
					Open
				</DropdownMenuTrigger>
				<DropdownMenuContent className="flex flex-col bg-black text-white gap-2">
					<DropdownMenuItem
						className="hover:cursor-pointer hover:bg-red-500"
						onClick={() => changePassword()}
					>
						Reset password
					</DropdownMenuItem>
					<DialogTrigger asChild onClick={() => setFormType('editRoles')}>
						<DropdownMenuItem className="hover:cursor-pointer hover:bg-red-500">
							Change Roles
						</DropdownMenuItem>
					</DialogTrigger>
					<DialogTrigger asChild onClick={() => setFormType('edit')}>
						<DropdownMenuItem className="hover:cursor-pointer hover:bg-red-500">
							Edit user
						</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<form>
				<DialogContent className="sm:max-w-[425px] bg-gray-500">
					<DialogHeader>
						<DialogTitle>Edit profile</DialogTitle>
						<DialogDescription>
							Make changes to your worker here. Click save when you&apos;re
							done.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<AuthFields
							formState={formState}
							formType={formType}
							register={changeInput}
						/>
						<Combobox
							defaultRoles={[{ role: 'ADMIN' }]}
							setRoles={setRoles}
							roles={roles}
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
							onClick={handleSubmit(
								formType === 'edit' ? onSubmit : onChangeRolesSubmit
							)}
						>
							Save changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	)
}

export default ChangeUserInfoDialog
