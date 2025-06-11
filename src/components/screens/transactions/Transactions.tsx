import BsIcon from '@/components/ui/BsIcon'
import CreateTransactionDialog from '@/components/ui/dialog/CreateTransactionDialog'
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
import { useState } from 'react'

const Transactions = () => {
	const [page, setPage] = useState<number>(0)
	const [size, setSize] = useState<number>(10)
	const [maxPages, setMaxPages] = useState<number>(0)

	const { data: transactions } = useQuery({
		queryKey: ['get all transactions'],
		queryFn: () => InvoicesService.getTransactions({ page, size }),
		select: (data) => data.data,
	})

	console.log(transactions?.content)

	return (
		<div>
			<CreateTransactionDialog title="CREATE TRANSACTION" />
			<Table>
				<TableCaption>A list of your recent transactions.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[200px]">Transaction</TableHead>
						<TableHead>Left Account</TableHead>
						<TableHead>Right Account</TableHead>
						<TableHead>Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{transactions?.content ? (
						transactions?.content.map((transaction) => (
							<TableRow key={transaction.description}>
								<TableCell className="font-medium">
									{transaction.description}
								</TableCell>
								<TableCell>{transaction.leftAccountName}</TableCell>
								<TableCell>{transaction.rightAccountName}</TableCell>
								<TableCell>{transaction.amount}$</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell>Not Found</TableCell>
						</TableRow>
					)}
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
export default Transactions
