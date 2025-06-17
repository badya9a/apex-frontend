import ChangeUserInfoDialog from '@/components/ui/dialog/ChangeUserInfoDialog'
import RegisterNewUserDialog from '@/components/ui/dialog/RegisterNewUserDialog'
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
import { UserService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const Workers = () => {
	const { data: allUsers } = useQuery({
		queryKey: ['get all users'],
		queryFn: () => UserService.getAll({ page, size }),
		select: (data) => data.data,
	})

	const [page, setPage] = useState(0)
	const [maxPages, setMaxPages] = useState(5)
	const size = 15

	useEffect(() => {
		setMaxPages(allUsers?.totalPages ? allUsers.totalPages : 1)
	}, [allUsers])

	return (
		<div className="flex flex-col gap-5">
			<div>
				<RegisterNewUserDialog />
			</div>
			<div>
				<Table>
					<TableCaption>A list of your employees.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Full name</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{allUsers?.content.map((w) => (
							<TableRow key={w.email}>
								<TableCell>{w.email}</TableCell>
								<TableCell className="flex gap-2">
									{w.roles.map((r) => (
										<p>{r}</p>
									))}
								</TableCell>
								<TableCell className="font-medium">
									{w.firstName} {w.lastName}
								</TableCell>
								<TableCell>
									<ChangeUserInfoDialog
										user={{
											publicId: w.publicId,
											email: w.email,
											phone: w.phone,
											firstName: w.firstName
												? w.firstName.split(' ')[0]
												: 'John Doe',
											lastName: w.lastName
												? w.lastName.split(' ')[1]
												: 'John Doe',
											roles: w.roles,
										}}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Pagination page={page} maxPages={maxPages} setPage={setPage} />
			</div>
		</div>
	)
}
export default Workers
