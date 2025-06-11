import ChangeUserInfoDialog from '@/components/ui/dialog/ChangeUserInfoDialog'
import RegisterNewUserDialog from '@/components/ui/dialog/RegisterNewUserDialog'
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
import { all } from 'axios'

const workers = [
	{
		id: '1',
		email: 'max@apex.com',
		fullName: 'Max Sazonov',
		roles: ['USER'],
		createdAt: '2004-05-25',
		updatedAt: '2025-06-06',
		phone: 1234567,
	},
	{
		id: '2',
		email: 'olya@apex.com',
		fullName: 'Olha Musiichuk',
		roles: ['ACCOUNTANT'],
		createdAt: '2004-05-25',
		updatedAt: '2025-06-06',
		phone: 1234567,
	},
	{
		id: '3',
		email: 'Vasya@apex.com',
		fullName: 'Bohdan Kozikov',
		roles: ['ADMIN'],
		createdAt: '2004-05-25',
		updatedAt: '2025-06-06',
		phone: 1234567,
	},
]

interface IChangeUserInfoDialog {
	id: string
	email: string
	phone: number
	firstName: string
	lastName: string
	roles: string[]
}

const Workers = () => {
	const { data: allUsers } = useQuery({
		queryKey: ['get all users'],
		queryFn: () => UserService.getAll(),
		select: (data) => data.data,
	})

	console.log(allUsers)

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
							<TableRow>
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
											id: w.id,
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
			</div>
		</div>
	)
}
export default Workers
