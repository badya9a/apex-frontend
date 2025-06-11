import BsIcon from '@/components/ui/BsIcon'
import CreateCustomerDialog from '@/components/ui/dialog/CreateCustomerDialog'
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
import { CustomersService } from '@/services/customers.service'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const Customers = () => {
	const [page, setPage] = useState<number>(0)
	const [size, setSize] = useState<number>(10)
	const [maxPages, setMaxPages] = useState<number>(0)

	const { data: allCustomers } = useQuery({
		queryKey: ['get all customers'],
		queryFn: () => CustomersService.getAll(),
		select: (data) => data.data,
	})

	console.log(allCustomers)

	return (
		<div>
			<CreateCustomerDialog />
			<Table>
				<TableCaption>A list of your customers.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Vendor</TableHead>
						<TableHead>Representative</TableHead>
						<TableHead>Billing Address</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead>email</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{allCustomers?.map((c) => (
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
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
export default Customers
