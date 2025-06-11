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
import { useMutation, useQueries, useQuery } from '@tanstack/react-query'
import { InvoicesService } from '@/services/invoices.service'
import { TransactionsPicker } from '../combbox/TransactionsPicker'
import { AccountsService } from '@/services/accounts.service'
import type { CreateInvoiceWithTransactionProps } from '@/shared/types/invoices.types'
import BsIcon from '../BsIcon'

const CreateTransactionDialog: FC<{ title: string }> = ({ title }) => {
	const [open, setOpen] = useState(false)
	const [amount, setAmount] = useState('')
	const [description, setDescription] = useState<string>('')
	const [leftAccount, setLeftAccount] = useState<{
		id: number
		name: string
		balance: number
		arrow: 'UP' | 'DOWN'
	}>()
	const [rightAccount, setRightAccount] = useState<{
		id: number
		name: string
		balance: number
		arrow: 'UP' | 'DOWN'
	}>()

	const { data: allAccounts } = useQuery({
		queryKey: ['get all accounts'],
		queryFn: () => AccountsService.getAll(),
		select: (data) => data.data,
	})

	const results = useQueries({
		queries: [
			{
				queryKey: ['get arrow', leftAccount?.id],
				queryFn: () =>
					InvoicesService.getTransactionArrow({
						id: leftAccount?.id,
						entryType: 'DEBIT',
					}),
			},
			{
				queryKey: ['get arrow', rightAccount?.id],
				queryFn: () =>
					InvoicesService.getTransactionArrow({
						id: rightAccount?.id,
						entryType: 'CREDIT',
					}),
			},
		],
		combine: (results) => {
			return {
				data: results.map((result) => result.data),
				pending: results.some((result) => result.isPending),
			}
		},
	})

	console.log(results)

	//send post request
	const { mutate } = useMutation({
		mutationKey: ['create transaction'],
		mutationFn: ({
			transactionRequest,
		}: Pick<CreateInvoiceWithTransactionProps, 'transactionRequest'>) =>
			InvoicesService.createTransaction({
				transactionRequest: transactionRequest,
			}),
		onSuccess: () => {
			toast('Transaction created successfully', {
				duration: 4,
			})
		},
	})

	const clearFields = () => {
		setAmount('')
		setDescription('')
		setLeftAccount(undefined)
		setRightAccount(undefined)
	}

	const handleSubmit = () => {
		mutate({
			transactionRequest: {
				leftAccountId: leftAccount?.id,
				rightAccountId: rightAccount?.id,
				amount: +amount,
				description: description,
			},
		})
		setOpen(false)
	}

	const handleOpenChange = (isOpen) => {
		setOpen(isOpen)
		clearFields()
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
					<DialogTitle>Transaction Information</DialogTitle>
					<DialogDescription>Enter transaction information</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						{leftAccount ? (
							<span className="flex items-center gap-1">
								{results.data[0]?.data === 'DOWN' ? (
									<BsIcon name="BsArrowDown" color="white" size={30} />
								) : (
									<BsIcon name="BsArrowUp" color="white" size={30} />
								)}
								Balance:
								<br />
								{leftAccount?.balance}$
							</span>
						) : (
							<span></span>
						)}
						<TransactionsPicker
							picked={leftAccount}
							placeholder="From account"
							setPicked={setLeftAccount}
							dataToPick={
								rightAccount
									? allAccounts
											?.filter((a) => a.id !== rightAccount.id)
											.map((a) => {
												return { id: a.id, name: a.name, balance: a.balance }
											})
									: allAccounts?.map((a) => {
											return { id: a.id, name: a.name, balance: a.balance }
									  })
							}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						{rightAccount ? (
							<span className="flex items-center gap-1">
								{results.data[1]?.data === 'DOWN' ? (
									<BsIcon name="BsArrowDown" color="white" size={30} />
								) : (
									<BsIcon name="BsArrowUp" color="white" size={30} />
								)}
								Balance:
								<br />
								{rightAccount?.balance}$
							</span>
						) : (
							<span></span>
						)}
						<TransactionsPicker
							placeholder="To account"
							picked={rightAccount}
							setPicked={setRightAccount}
							dataToPick={
								leftAccount
									? allAccounts
											?.filter((a) => a.id !== leftAccount.id)
											.map((a) => {
												return { id: a.id, name: a.name, balance: a.balance }
											})
									: allAccounts?.map((a) => {
											return { id: a.id, name: a.name, balance: a.balance }
									  })
							}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="amount" className="text-right">
							Amount
						</Label>
						<Input
							id="amount"
							name="amount"
							type="number"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="description" className="text-right">
							Description
						</Label>
						<Input
							id="description"
							name="description"
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="col-span-3"
						/>
					</div>
				</div>

				<DialogFooter className="flex justify-between">
					<Button
						type="button"
						variant="outline"
						onClick={() => handleOpenChange(false)}
					>
						Cancel
					</Button>
					<Button
						type="button"
						onClick={handleSubmit}
						disabled={
							!(leftAccount?.id && rightAccount?.id && description && amount)
						}
					>
						Submit
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default CreateTransactionDialog
