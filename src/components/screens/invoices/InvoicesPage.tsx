import MultiPageDialog from '@/components/ui/dialog/CreateInvoiceDialog'
import Pagination from '@/components/ui/pagination/Pagination'
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
	const size = 10
	const [maxPages, setMaxPages] = useState<number>(10)

	const { data: invoices, isLoading } = useQuery({
		queryKey: ['get all invoices', page],
		queryFn: () => InvoicesService.getAll({ page, size }),
		select: (data) => data.data,
	})

	useEffect(() => {
		setMaxPages(invoices?.totalPages ? invoices?.totalPages : 1)
	}, [invoices])

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
							<TableRow key={invoice.description}>
								<TableCell className="font-medium">
									{invoice.invoiceNumber}
								</TableCell>
								<TableCell>{invoice.customer}</TableCell>
								<TableCell>{invoice.issueDate.toString()}</TableCell>
								<TableCell>{invoice.dueDate.toString()}</TableCell>
								<TableCell>{invoice.description}</TableCell>
								<TableCell>{invoice.amount}$</TableCell>
								<TableCell>{invoice.status}</TableCell>
								<TableCell>
									<EditInvoice
										invoiceNumber={invoice?.invoiceNumber}
										defaultValue={invoice?.description}
									/>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
			<Pagination page={page} maxPages={maxPages} setPage={setPage} />
		</div>
	)
}
export default InvoicesPage
