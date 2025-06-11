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
import { Button } from '../button'
import AuthFields from '@/components/screens/login/AuthFields'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Combobox } from '../Combobox'
import type { availableRoles, IUser } from '@/shared/types/user.types'
import { AuthService } from '@/services/auth/auth.service'

interface IChangeUserInfoDialog {
	id: string
	email: string
	phone: number
	firstName: string
	lastName: string
	roles: typeof availableRoles
}

const RegisterNewUserDialog = () => {
	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<Omit<IUser, 'id'>>({
		mode: 'onChange',
	})

	const [roles, setRoles] = useState<{ role: string }[]>([])

	const { mutate, isPending } = useMutation({
		mutationFn: (data: {
			email: string
			firstName: string
			lastName: string
			phone: number
			roles: typeof availableRoles
		}) =>
			AuthService.register({
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
		roles,
	}) => {
		mutate({ email, firstName, lastName, phone, roles })
	}

	return (
		<Dialog onOpenChange={() => reset()}>
			<form>
				<DialogTrigger asChild>
					<button className="p-3 bg-green-600 rounded-lg hover:cursor-pointer ">
						CREATE NEW USER
					</button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] bg-gray-500">
					<DialogHeader>
						<DialogTitle>Create worker</DialogTitle>
						<DialogDescription>
							Create new worker here. Click save when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<AuthFields
							formState={formState}
							formType="edit"
							register={registerInput}
						/>
						<Combobox defaultRoles={[]} setRoles={setRoles} roles={roles} />
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button
							type="submit"
							className="hover:cursor-pointer"
							disabled={isPending}
							onClick={handleSubmit(onSubmit)}
						>
							Create user
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	)
}

export default RegisterNewUserDialog
