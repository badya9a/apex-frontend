import CreateBillDialog from '@/components/ui/dialog/CreateBillDialog'
import Pagination from '@/components/ui/pagination/Pagination'
import { EditBill } from '@/components/ui/popover/EditBill'
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

const Bills = () => {
	const [page, setPage] = useState<number>(0)
	const size = 10
	const [maxPages, setMaxPages] = useState<number>(0)

	const { data: bills } = useQuery({
		queryKey: ['get all bills', page],
		queryFn: () => InvoicesService.getBills({ page, size }),
		select: (data) => data.data,
	})

	useEffect(() => {
		setMaxPages(bills?.totalPages ? bills?.totalPages : 1)
	}, [bills])

	return (
		<div>
			<CreateBillDialog title="Create bill" />
			<Table>
				<TableCaption>A list of your recent bills.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Bill Number</TableHead>
						<TableHead>Vendor</TableHead>
						<TableHead>Issue date</TableHead>
						<TableHead>Due date</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Amount</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{bills?.content.map((b) => (
						<TableRow>
							<TableCell className="font-medium">{b.billNumber}</TableCell>
							<TableCell>{b.vendor}</TableCell>
							<TableCell>{b.issueDate.toString()}</TableCell>
							<TableCell>{b.dueDate.toString()}</TableCell>
							<TableCell>{b.description}</TableCell>
							<TableCell>{b.amount}$</TableCell>
							<TableCell>{b.status}</TableCell>
							<TableCell>
								<EditBill
									billNumber={b.billNumber}
									defaultValue={b.description}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Pagination page={page} setPage={setPage} maxPages={maxPages} />
		</div>
	)
}
export default Bills
