import { useEffect, useState, type ChangeEvent, type FC } from 'react'
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
import { Picker } from '../combbox/Picker'
import DatePicker from '../date-picker/DatePicker'
import { InvoicesService } from '@/services/invoices.service'
import { TransactionsPicker } from '../combbox/TransactionsPicker'
import { AccountsService } from '@/services/accounts.service'
import type { CreateBillWithTransactionProps } from '@/shared/types/invoices.types'
import { CustomersService } from '@/services/customers.service'
import BsIcon from '../BsIcon'

const CreateBillDialog: FC<{ title: string }> = ({ title }) => {
	const [open, setOpen] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [issueDate, setIssueDate] = useState<Date | null>(null)
	const [dueDate, setDueDate] = useState<Date | null>(null)
	const [vendor, setVendor] = useState<{
		fullName: string
		id: number
		companyName: string
	} | null>(null)
	const [leftAccount, setLeftAccount] = useState<{
		id: number
		name: string
		balance: number
	} | null>(null)
	const [rightAccount, setRightAccount] = useState<{
		id: number
		name: string
		balance: number
	} | null>(null)

	const { data: BillNumberData } = useQuery({
		queryKey: ['get bill number'],
		queryFn: () => InvoicesService.getBillNumber(),
		select: (data) => data.data,
	})

	const [formData, setFormData] = useState({
		billNumber: BillNumberData,
		amount: 0,
		billDescription: '',
		transactionDescription: `Payment for ${BillNumberData}`,
	})

	const { data: allAccounts } = useQuery({
		queryKey: ['get all accounts'],
		queryFn: () => AccountsService.getAll(),
		select: (data) => data.data,
	})

	const { data: allVendors } = useQuery({
		queryKey: ['get all vendors'],
		queryFn: () => CustomersService.getVendors(),
		select: (data) => data.data,
	})

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleNextPage = () => {
		setCurrentPage(2)
	}

	const handlePrevPage = () => {
		setCurrentPage(1)
	}

	//send post request
	const { mutate } = useMutation({
		mutationKey: ['create bill with transaction'],
		mutationFn: ({
			billRequest,
			transactionRequest,
		}: CreateBillWithTransactionProps) =>
			InvoicesService.createBillWithTransaction({
				billRequest: billRequest,
				transactionRequest: transactionRequest,
			}),
		onSuccess: () => {
			toast('Bill and transaction created successfully', {
				duration: 4000,
			})
		},
	})

	const handleSubmit = () => {
		mutate({
			billRequest: {
				vendorId: vendor?.id!,
				billNumber: formData?.billNumber?.billNumber!,
				amount: formData.amount,
				issueDate: issueDate?.toISOString().split('T')[0]!,
				dueDate: dueDate?.toISOString().split('T')[0]!,
				description: formData.billDescription,
			},
			transactionRequest: {
				leftAccountId: leftAccount?.id!,
				rightAccountId: rightAccount?.id!,
				amount: +formData.amount,
				description: formData.transactionDescription,
			},
		})
		setOpen(false)
		setCurrentPage(1) // Reset to first page for next time
		clearFields()
	}

	const results = useQueries({
		queries: [
			{
				queryKey: ['get arrow', leftAccount?.id],
				queryFn: () =>
					InvoicesService.getTransactionArrow({
						id: leftAccount?.id!,
						entryType: 'DEBIT',
					}),
				enabled: !!leftAccount?.id,
			},
			{
				queryKey: ['get arrow', rightAccount?.id],
				queryFn: () =>
					InvoicesService.getTransactionArrow({
						id: rightAccount?.id!,
						entryType: 'CREDIT',
					}),
				enabled: !!rightAccount?.id,
			},
		],
		combine: (results) => {
			return {
				data: results.map((result) => result.data),
				pending: results.some((result) => result.isPending),
			}
		},
	})

	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen)
		if (!isOpen) {
			// Reset to first page when dialog closes
			clearFields()
			setCurrentPage(1)
		}
	}

	useEffect(() => {
		if (BillNumberData) {
			setFormData((prev) => ({
				...prev,
				billNumber: BillNumberData,
				transactionDescription: `Payment for ${BillNumberData}`,
			}))
		}
	}, [BillNumberData])

	const clearFields = () => {
		setFormData({
			...formData,
			amount: 0,
			billDescription: '',
			transactionDescription: '',
		})
		setDueDate(null)
		setIssueDate(null)
		setVendor(null)
		setLeftAccount(null)
		setRightAccount(null)
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant="outline" className="hover:cursor-pointer">
					{title}
				</Button>
			</DialogTrigger>

			<DialogContent className="w-full bg-white">
				{currentPage === 1 ? (
					<>
						<DialogHeader>
							<DialogTitle>Bill information</DialogTitle>
							<DialogDescription>
								Enter bill details (Page 1 of 2)
							</DialogDescription>
						</DialogHeader>

						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Picker
									dataToPick={allVendors!?.map((c) => {
										return {
											id: c.id,
											companyName: c.companyName,
											fullName: `${c.firstName} ${c.lastName}`,
										}
									})}
									picked={vendor}
									placeholder="Pick vendor"
									setPicked={setVendor}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="billNumber" className="text-right">
									Bill Number
								</Label>
								<Input
									disabled
									id="billNumber"
									name="billNumber"
									type="text"
									value={formData.billNumber?.billNumber}
									className="col-span-3"
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
									value={formData.amount}
									onChange={handleInputChange}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="billDescription" className="text-right">
									Description
								</Label>
								<Input
									id="billDescription"
									name="billDescription"
									type="text"
									value={formData.billDescription}
									onChange={handleInputChange}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<DatePicker
									date={issueDate}
									setDate={setIssueDate}
									label={'Issue date'}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<DatePicker
									date={dueDate}
									setDate={setDueDate}
									label={'Due date'}
								/>
							</div>
						</div>

						<DialogFooter>
							<Button
								type="button"
								onClick={handleNextPage}
								disabled={
									!(
										vendor?.id &&
										formData.billNumber &&
										formData.billDescription &&
										formData.amount > 0 &&
										issueDate &&
										dueDate
									)
								}
							>
								Next
							</Button>
						</DialogFooter>
					</>
				) : (
					<>
						<DialogHeader>
							<DialogTitle>Transaction Information</DialogTitle>
							<DialogDescription>
								Enter your transaction details (Page 2 of 2)
							</DialogDescription>
						</DialogHeader>

						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								{leftAccount ? (
									<span className="flex items-center gap-1">
										{results.data[0]?.data === 'DOWN' ? (
											<BsIcon name="BsArrowDown" color="black" size={30} />
										) : (
											<BsIcon name="BsArrowUp" color="black" size={30} />
										)}
										Balance:
										<br />
										{leftAccount?.balance}$
									</span>
								) : (
									<span></span>
								)}
								<TransactionsPicker
									picked={leftAccount!}
									placeholder="From account"
									setPicked={setLeftAccount}
									dataToPick={
										rightAccount
											? allAccounts!
													?.filter((a) => a.id !== rightAccount.id)
													.map((a) => {
														return {
															id: a.id,
															name: a.name,
															balance: a.balance,
														}
													})
											: allAccounts!?.map((a) => {
													return { id: a.id, name: a.name, balance: a.balance }
											  })
									}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								{rightAccount ? (
									<span className="flex items-center gap-1">
										{results.data[1]?.data === 'DOWN' ? (
											<BsIcon name="BsArrowDown" color="black" size={30} />
										) : (
											<BsIcon name="BsArrowUp" color="black" size={30} />
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
									picked={rightAccount!}
									setPicked={setRightAccount}
									dataToPick={
										leftAccount
											? allAccounts!
													?.filter((a) => a.id !== leftAccount.id)
													.map((a) => {
														return {
															id: a.id,
															name: a.name,
															balance: a.balance,
														}
													})
											: allAccounts!?.map((a) => {
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
									disabled
									id="amount"
									name="amount"
									type="number"
									value={formData.amount}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="transactionDescription" className="text-right">
									Description
								</Label>
								<Input
									id="transactionDescription"
									name="transactionDescription"
									type="text"
									value={formData.transactionDescription}
									onChange={handleInputChange}
									className="col-span-3"
								/>
							</div>
						</div>

						<DialogFooter className="flex justify-between">
							<Button type="button" variant="outline" onClick={handlePrevPage}>
								Back
							</Button>
							<Button
								type="button"
								onClick={handleSubmit}
								disabled={
									!(
										leftAccount?.id &&
										rightAccount?.id &&
										formData.transactionDescription
									)
								}
							>
								Submit
							</Button>
						</DialogFooter>
					</>
				)}
			</DialogContent>
		</Dialog>
	)
}

export default CreateBillDialog
