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
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router'

const vendors = [
	{
		id: 1,
		vendor: 'Company',
		representative: 'Bohdan Kozikov',
		billing_address: 'somewhere',
		method: 'debit',
		amount: 300,
	},
	{
		id: 2,
		vendor: 'Vasya',
		representative: 'Bohdan Kozikov',
		billing_address: 'somewhere',
		method: 'debit',
		amount: 300,
	},
	{
		id: 3,
		vendor: 'Vasya',
		representative: 'Bohdan Kozikov',
		billing_address: 'somewhere',
		method: 'debit',
		amount: 300,
	},
	{
		id: 4,
		vendor: 'Vasya',
		representative: 'Bohdan Kozikov',
		billing_address: 'somewhere',
		method: 'debit',
		amount: 300,
	},
	{
		id: 5,
		vendor: 'Vasya',
		representative: 'Bohdan Kozikov',
		billing_address: 'somewhere',
		method: 'debit',
		amount: 300,
	},
]

const Vendors = () => {
	const { vendorId } = useParams()
	const vendorRefs = useRef(new Map())

	const { data: allVendors } = useQuery({
		queryKey: ['get all vendors'],
		queryFn: () => VendorsService.getAll(),
		select: (data) => data.data,
	})

	useEffect(() => {
		if (vendorId) {
		}
	}, [])

	const setRowRef = (element, id) => {
		if (element) {
			vendorRefs.current.set(id, element)
		} else {
			vendorRefs.current.delete(id)
		}
	}

	console.log(allVendors)

	return (
		<div>
			<Table>
				<TableCaption>A list of your vendors.</TableCaption>
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
					{allVendors?.map((v) => (
						<TableRow
							className={``}
							ref={({
								el,
								index,
							}: {
								el: HTMLTableRowElement
								index: number
							}) => setRowRef(el, index)}
						>
							<TableCell className="font-medium">{v.companyName}</TableCell>
							<TableCell className="font-medium">{v.fullName}</TableCell>
							<TableCell>
								{v.billingStreet} {v.billingCity} {v.billingCountry}{' '}
								{v.billingZipCode}
							</TableCell>
							<TableCell className="flex">{v.phone}</TableCell>
							<TableCell>{v.email}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
export default Vendors
