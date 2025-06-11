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
import { useMutation } from '@tanstack/react-query'
import { UserService } from '@/services/user.service'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../button'

const ChangeUserPassword = () => {
	const [password, setPassword] = useState('')

	const { mutate: changePassword, isPending } = useMutation({
		mutationFn: () => UserService.changeUserPassword(password),
		onSuccess: () => {
			toast('Password changed successfully', {
				duration: 2000,
			})
			setPassword('')
		},
	})

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button className="hover:cursor-pointer w-full flex bg-white border-1 border-gray-300 p-2 rounded-lg justify-center">
					Change password
				</button>
			</DialogTrigger>
			<form>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit your password</DialogTitle>
						<DialogDescription>
							Make changes to your worker roles here. Click save when
							you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-2">
						<label htmlFor="password">Password</label>
						<input
							required
							id="password"
							minLength={8}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							className="p-3 border-b-1 border-b-blue-600 border-r-1 border-r-blue-600 w-full rounded-lg outline-none"
						/>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button
							disabled={password.length >= 8 && isPending}
							type="submit"
							className="hover:cursor-pointer"
							onClick={() => changePassword()}
						>
							Save changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	)
}

export default ChangeUserPassword
