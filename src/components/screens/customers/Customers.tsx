import CreateCustomerDialog from '@/components/ui/dialog/CreateCustomerDialog'
import Pagination from '@/components/ui/pagination/Pagination'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { CustomersService } from '@/services/customers.service'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const Customers = () => {
	const [page, setPage] = useState(0)
	const [maxPages, setMaxPages] = useState(1)
	const size = 15

	const { data: allCustomers } = useQuery({
		queryKey: ['get all customers with pagination', page],
		queryFn: () => CustomersService.getCustomersWithPagination({ page, size }),
		select: ({ data }) => data,
	})

	useEffect(() => {
		if (allCustomers?.totalPages) {
			setMaxPages(allCustomers?.totalPages!)
		}
	}, [allCustomers?.totalPages])

	return (
		<div>
			<CreateCustomerDialog title="CREATE NEW CUSTOMER" formType="create" />
			<Table>
				<TableCaption>A list of your customers.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Vendor</TableHead>
						<TableHead>Representative</TableHead>
						<TableHead>Billing Address</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{allCustomers?.content.map((c) => (
						<TableRow className={``} key={c.email}>
							<TableCell className="font-medium">{c.companyName}</TableCell>
							<TableCell className="font-medium">
								{c.firstName} {c.lastName}
							</TableCell>
							<TableCell>
								{c.billingStreet} {c.billingCity} {c.billingCountry}{' '}
								{c.billingZipCode}
							</TableCell>
							<TableCell className="flex">{c.phone}</TableCell>
							<TableCell>{c.email}</TableCell>
							<TableCell>
								<CreateCustomerDialog
									title="Edit"
									formType="update"
									contact={c}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Pagination page={page} maxPages={maxPages} setPage={setPage} />
		</div>
	)
}
export default Customers
