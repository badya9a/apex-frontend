import CreateTransactionDialog from '@/components/ui/dialog/CreateTransactionDialog'
import Pagination from '@/components/ui/pagination/Pagination'
import { EditTransaction } from '@/components/ui/popover/EditTransaction'
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

const Transactions = () => {
	const [page, setPage] = useState<number>(0)
	const size = 10
	const [maxPages, setMaxPages] = useState<number>(0)

	const { data: transactions } = useQuery({
		queryKey: ['get all transactions', page],
		queryFn: () => InvoicesService.getTransactions({ page, size }),
		select: ({ data }) => data,
	})

	useEffect(() => {
		setMaxPages(transactions?.totalPages ? transactions?.totalPages : 1)
	}, [transactions])

	console.log(transactions?.content)

	return (
		<div>
			<CreateTransactionDialog title="CREATE TRANSACTION" />
			<Table>
				<TableCaption>A list of your recent transactions.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[200px]">Transaction</TableHead>
						<TableHead></TableHead>
						<TableHead>Left Account</TableHead>
						<TableHead>Right Account</TableHead>
						<TableHead>Amount</TableHead>
						<TableHead>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{transactions?.content ? (
						transactions?.content.map((transaction) => (
							<TableRow key={transaction.id}>
								<TableCell className="font-medium">
									{transaction.description}
								</TableCell>
								<TableCell></TableCell>
								<TableCell>{transaction.leftAccountName}</TableCell>
								<TableCell>{transaction.rightAccountName}</TableCell>
								<TableCell>{transaction.amount}$</TableCell>
								<TableCell>
									<EditTransaction
										defaultValue={transaction.description}
										id={transaction.id}
									/>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell>Not Found</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<Pagination page={page} setPage={setPage} maxPages={maxPages} />
		</div>
	)
}
export default Transactions
