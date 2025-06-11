import BsIcon from '@/components/ui/BsIcon'
import MultiPageDialog from '@/components/ui/dialog/CreateInvoiceDialog'
import { EditInvoice } from '@/components/ui/popover/EditInvoice'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { InvoicesService } from '@/services/invoices.service'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const InvoicesPage = () => {
	const [page, setPage] = useState<number>(0)
	const [size, setSize] = useState<number>(10)
	const [maxPages, setMaxPages] = useState<number>(10)

	const {
		data: invoices,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['get all invoices'],
		queryFn: () => InvoicesService.getAll({ page, size }),
		select: (data) => data.data,
	})

	useEffect(() => {
		setMaxPages(invoices?.totalPages)
	}, [invoices?.totalPages])

	useEffect(() => {
		refetch()
	}, [page])

	console.log(invoices)
	console.log(maxPages)
	console.log(page)

	return (
		<div>
			<MultiPageDialog title="Create invoice" />
			<Table>
				<TableCaption>A list of your recent invoices.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Invoice</TableHead>
						<TableHead>Customer</TableHead>
						<TableHead>Issue date</TableHead>
						<TableHead>Due date</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Amount</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isLoading ? (
						<TableRow>
							<TableCell>Loading...</TableCell>
						</TableRow>
					) : (
						invoices?.content.map((invoice) => (
							<TableRow key={invoice.id}>
								<TableCell className="font-medium">{invoice.code}</TableCell>
								<TableCell>{invoice.customer}</TableCell>
								<TableCell>{invoice.issueDate}</TableCell>
								<TableCell>{invoice.dueDate}</TableCell>
								<TableCell>{invoice.description}</TableCell>
								<TableCell>{invoice.amount}$</TableCell>
								<TableCell>{invoice.status}</TableCell>
								<TableCell>
									<EditInvoice
										code={invoice?.code}
										defaultValue={invoice?.description}
									/>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
			<div className="flex gap-2">
				<button
					className="hover:cursor-pointer"
					onClick={() => setPage(0)}
					disabled={page === 0 ? true : false}
				>
					<BsIcon name="BsChevronDoubleLeft" size={20} color="BsChevronLeft" />
				</button>
				<button
					className="hover:cursor-pointer"
					onClick={() => setPage((prev) => prev - 1)}
					disabled={page === 0 ? true : false}
				>
					<BsIcon name="BsChevronLeft" size={20} color="white" />
				</button>
				<p className="text-lg">{page + 1}</p>
				<button
					disabled={maxPages - 1 === page ? true : false}
					onClick={() => setPage((prev) => prev + 1)}
					className="hover:cursor-pointer"
				>
					<BsIcon name="BsChevronRight" size={20} color="white" />
				</button>
			</div>
		</div>
	)
}
export default InvoicesPage
