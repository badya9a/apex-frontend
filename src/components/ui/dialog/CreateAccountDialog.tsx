import { useState, type FC } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { AccountsService } from '@/services/accounts.service'
import { AccountTypePicker } from '../combbox/AccountTypePicker'

const CreateAccountDialog: FC<{ title: string }> = ({ title }) => {
	const [open, setOpen] = useState(false)
	const [name, setName] = useState<string>('')
	const [type, setType] = useState('')

	//send post request
	const { mutate } = useMutation({
		mutationKey: ['create invoice with transaction'],
		mutationFn: () => AccountsService.createAccount({ name, type }),
		onSuccess: () => {
			toast('Account created successfully', {
				duration: 4,
			})
		},
	})

	const handleSubmit = () => {
		mutate()
		handleOpenChange(false)
	}

	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen)
		if (!isOpen) {
			setName('')
			setType('')
		}
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant="outline" className="hover:cursor-pointer">
					{title}
				</Button>
			</DialogTrigger>

			<DialogContent className="w-full bg-white">
				<DialogHeader>
					<DialogTitle>Create account</DialogTitle>
					<DialogDescription>Create account</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Account name
						</Label>
						<Input
							id="name"
							name="name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="col-span-3"
						/>
					</div>
					<AccountTypePicker
						dataToPick={['ASSET', 'REVENUE', 'EXPENSES', 'LIABILITY', 'EQUITY']}
						picked={type}
						setPicked={setType}
						placeholder="Select type"
					/>
				</div>
				<DialogFooter className="flex justify-between">
					<Button type="button" variant="outline">
						Cancel
					</Button>
					<Button type="button" onClick={handleSubmit} disabled={!name}>
						Create
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default CreateAccountDialog
