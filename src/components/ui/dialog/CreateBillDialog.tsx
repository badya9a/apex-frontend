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
import { Picker } from '../combbox/Picker'
import { CustomersService } from '@/services/customers.service'
import DatePicker from '../date-picker/DatePicker'
import { VendorsService } from '@/services/vendors.service'

const MultiPageDialog: FC<{ title: string }> = ({ title }) => {
	const [open, setOpen] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [issueDate, setIssueDate] = useState<Date | undefined>(undefined)
	const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
	const [vendorId, setVendorId] = useState<number>()
	const [formData, setFormData] = useState({
		accountLeft: '',
		accountRight: '',
		billNumber: '',
		amount: 0,
		billDescription: '',
		transactionDescription: '',
	})

	//getAllCustomers and getAllAccounts
	// const {} = useQueries({
	// 	queries: [],
	// })

	const { data: allCustomers } = useQuery({
		queryKey: ['get all vendors'],
		queryFn: () => VendorsService.getAll(),
		select: (data) => data.data,
	})

	const handleInputChange = (e) => {
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
	// const {} = useMutation()

	const handleSubmit = () => {
		console.log('Form submitted:', formData)
		setOpen(false)
		setCurrentPage(1) // Reset to first page for next time
		toast('Invoice created Successfully', {
			duration: 3,
			className: 'color-green-400',
		})
	}

	const handleOpenChange = (isOpen) => {
		setOpen(isOpen)
		if (!isOpen) {
			// Reset to first page when dialog closes
			setCurrentPage(1)
		}
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant="outline" className="hover:cursor-pointer">
					{title}
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				{currentPage === 1 ? (
					<>
						<DialogHeader>
							<DialogTitle>Bill Information</DialogTitle>
							<DialogDescription>
								Enter bill details (Page 1 of 2)
							</DialogDescription>
						</DialogHeader>

						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Picker
									dataToPick={allCustomers}
									picked={vendorId}
									placeholder="Pick vendor"
									setPicked={setVendorId}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="billNumber" className="text-right">
									Invoice Number
								</Label>
								<Input
									disabled
									id="billNumber"
									name="billNumber"
									type="text"
									value={formData.billNumber}
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
									disabled
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
									!vendorId &&
									!formData.billNumber &&
									!formData.billDescription &&
									!formData.amount
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
							<div className="grid grid-cols-4 items-center gap-4">picker</div>
							<div className="grid grid-cols-4 items-center gap-4">picker</div>
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
							<Button type="button" onClick={handleSubmit}>
								Submit
							</Button>
						</DialogFooter>
					</>
				)}
			</DialogContent>
		</Dialog>
	)
}

export default MultiPageDialog
