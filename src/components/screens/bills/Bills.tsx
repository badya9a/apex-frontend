import BsIcon from '@/components/ui/BsIcon'
import MultiPageDialog from '@/components/ui/dialog/CreateInvoiceDialog'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const Bills = () => {
	const [page, setPage] = useState<number>(0)
	const [size, setSize] = useState<number>(10)
	const [maxPages, setMaxPages] = useState<number>(0)

	return (
		<div>
			Create bill
			<Table>
				<TableCaption>A list of your recent bills.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Code</TableHead>
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
					<TableRow>
						<TableCell className="font-medium">INV001</TableCell>
						<TableCell>Vendor</TableCell>
						<TableCell>20.05.2025</TableCell>
						<TableCell>23.05.2025</TableCell>
						<TableCell>12 tables</TableCell>
						<TableCell>1050$</TableCell>
						<TableCell>Paid</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<div className="flex gap-2">
				<button>
					<BsIcon name="BsChevronDoubleLeft" size={20} color="BsChevronLeft" />
				</button>
				<button>
					<BsIcon name="BsChevronLeft" size={20} color="white" />
				</button>
				<p className="text-lg">{page}</p>
				<button>
					<BsIcon name="BsChevronRight" size={20} color="white" />
				</button>
			</div>
		</div>
	)
}
export default Bills
