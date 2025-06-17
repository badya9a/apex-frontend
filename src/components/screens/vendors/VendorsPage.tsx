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
import { VendorsService } from '@/services/vendors.service'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'

const Vendors = () => {
	const { vendorId } = useParams()
	const vendorRefs = useRef<Record<string, HTMLTableRowElement | null>>({})
	const [page, setPage] = useState(0)
	const [maxPages, setMaxPages] = useState(1)
	const size = 15

	const { data: allVendors } = useQuery({
		queryKey: ['get all vendors with pagination', page],
		queryFn: () => VendorsService.getVendorsWithPagination({ page, size }),
		select: ({ data }) => data,
	})

	useEffect(() => {
		if (allVendors?.totalPages) {
			setMaxPages(allVendors?.totalPages!)
		}
	}, [allVendors?.totalPages])

	useEffect(() => {
		if (vendorId !== undefined) {
			highlightRow(Number(vendorId))
		}
	}, [vendorId, allVendors])

	const highlightRow = (id: number) => {
		// Access the row DOM element
		const vendor = vendorRefs.current[id]
		if (vendor) {
			vendor.style.backgroundColor = 'red'
			setTimeout(() => {
				vendor.style.backgroundColor = ''
			}, 2000)
		}
	}

	return (
		<div>
			<CreateCustomerDialog title="Create new vendor" formType="create" />
			<Table>
				<TableCaption>A list of your vendors.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Vendor</TableHead>
						<TableHead>Representative</TableHead>
						<TableHead>Billing Address</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead>email</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{allVendors?.content.length ? (
						allVendors?.content.map((v) => (
							<TableRow
								key={v.id}
								className={``}
								ref={(el: HTMLTableRowElement | null) =>
									void (vendorRefs.current[v.id] = el)
								}
							>
								<TableCell className="font-medium">{v.companyName}</TableCell>
								<TableCell className="font-medium">
									{v.firstName} {v.lastName}
								</TableCell>
								<TableCell>
									{v.billingStreet} {v.billingCity} {v.billingCountry}{' '}
									{v.billingZipCode}
								</TableCell>
								<TableCell className="flex">{v.phone}</TableCell>
								<TableCell>{v.email}</TableCell>
								<TableCell>
									<CreateCustomerDialog
										title="Edit"
										formType="update"
										contact={v}
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
			<Pagination page={page} maxPages={maxPages} setPage={setPage} />
		</div>
	)
}
export default Vendors
