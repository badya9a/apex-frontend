import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { AccountsService } from '@/services/accounts.service'
import { useMutation, useQuery } from '@tanstack/react-query'

const Accounts = () => {
	const { data: allAccounts } = useQuery({
		queryKey: ['get all vendors'],
		queryFn: () => AccountsService.getAll(),
		select: (data) => data.data,
	})

	const { mutate: deleteAccount } = useMutation({
		mutationKey: ['delete account'],
		mutationFn: (id: number) => AccountsService.deleteById(id),
	})

	return (
		<div>
			<Table>
				<TableCaption>A list of your accounts.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Code</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Balance</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{allAccounts?.map((a) => (
						<TableRow key={a.name}>
							<TableCell className="font-medium">{a.code}</TableCell>
							<TableCell>{a.name}</TableCell>
							<TableCell>{a.type}</TableCell>
							<TableCell>{a.balance}</TableCell>
							<TableCell
								onClick={() => deleteAccount(a.id)}
								className="hover:cursor-pointer"
							>
								Delete
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
export default Accounts
