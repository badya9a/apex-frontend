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
import { CustomersService } from '@/services/customers.service'
import DatePicker from '../date-picker/DatePicker'
import { InvoicesService } from '@/services/invoices.service'
import { TransactionsPicker } from '../combbox/TransactionsPicker'
import { AccountsService } from '@/services/accounts.service'
import type { CreateInvoiceWithTransactionProps } from '@/shared/types/invoices.types'
import BsIcon from '../BsIcon'

const CreateInvoiceDialog: FC<{ title: string }> = ({ title }) => {
	const [open, setOpen] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [issueDate, setIssueDate] = useState<Date | null>(null)
	const [dueDate, setDueDate] = useState<Date | null>(null)
	const [customer, setCustomer] = useState<{
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

	const { data: invoiceNumberData } = useQuery({
		queryKey: ['get invoice number'],
		queryFn: () => InvoicesService.getInvoiceNumber(),
		select: (data) => data.data,
	})

	const [formData, setFormData] = useState({
		invoiceNumber: invoiceNumberData?.invoiceNumber,
		amount: 0,
		invoiceDescription: '',
		transactionDescription: `Payment for ${invoiceNumberData}`,
	})

	const { data: allAccounts } = useQuery({
		queryKey: ['get all accounts'],
		queryFn: () => AccountsService.getAll(),
		select: (data) => data.data,
	})

	const { data: allCustomers } = useQuery({
		queryKey: ['get all customers'],
		queryFn: () => CustomersService.getAll(),
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
		mutationKey: ['create invoice with transaction'],
		mutationFn: ({
			invoiceRequest,
			transactionRequest,
		}: CreateInvoiceWithTransactionProps) =>
			InvoicesService.createInvoiceWithTransaction({
				invoiceRequest: invoiceRequest,
				transactionRequest: transactionRequest,
			}),
		onSuccess: () => {
			toast('Invoice and transaction created successfully', {
				duration: 4,
			})
		},
	})

	const handleSubmit = () => {
		mutate({
			invoiceRequest: {
				customerId: customer?.id!,
				invoiceNumber: formData?.invoiceNumber!,
				amount: formData.amount,
				issueDate: issueDate?.toISOString().split('T')[0]!,
				dueDate: dueDate?.toISOString().split('T')[0]!,
				description: formData.invoiceDescription,
			},
			transactionRequest: {
				leftAccountId: leftAccount?.id!,
				rightAccountId: rightAccount?.id!,
				amount: formData.amount,
				description: formData.transactionDescription,
			},
		})
		setOpen(false)
		setCurrentPage(1) // Reset to first page for next time
	}

	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen)
		if (!isOpen) {
			clearFields()
			// Reset to first page when dialog closes
			setCurrentPage(1)
		}
	}

	useEffect(() => {
		if (invoiceNumberData?.invoiceNumber) {
			console.log('doing it')
			setFormData((prev) => ({
				...prev,
				invoiceNumber: invoiceNumberData.invoiceNumber,
				transactionDescription: `Payment for ${invoiceNumberData}`,
			}))
		}
	}, [invoiceNumberData])

	const clearFields = () => {
		setFormData({
			...formData,
			amount: 0,
			invoiceDescription: '',
			transactionDescription: '',
		})
		setDueDate(null)
		setIssueDate(null)
		setCustomer(null)
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
							<DialogTitle>Invoice information</DialogTitle>
							<DialogDescription>
								Enter invoice details (Page 1 of 2)
							</DialogDescription>
						</DialogHeader>

						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Picker
									dataToPick={allCustomers!?.map((c) => {
										return {
											id: c.id,
											companyName: c.companyName,
											fullName: `${c.firstName} ${c.lastName}`,
										}
									})}
									picked={customer}
									placeholder="Pick customer"
									setPicked={setCustomer}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="invoiceNumber" className="text-right">
									Invoice Number
								</Label>
								<Input
									disabled
									id="invoiceNumber"
									name="invoiceNumber"
									type="text"
									value={formData.invoiceNumber}
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
								<Label htmlFor="invoiceDescription" className="text-right">
									Description
								</Label>
								<Input
									id="invoiceDescription"
									name="invoiceDescription"
									type="text"
									value={formData.invoiceDescription}
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
										customer?.id &&
										formData.invoiceNumber &&
										formData.invoiceDescription &&
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
									picked={leftAccount}
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
									picked={rightAccount}
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

export default CreateInvoiceDialog
