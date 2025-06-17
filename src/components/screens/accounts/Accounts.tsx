import ChangeAccountDialog from '@/components/ui/dialog/ChangeAccountDialog'
import CreateAccountDialog from '@/components/ui/dialog/CreateAccountDialog'
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
import type { IAccount } from '@/shared/types/accounts'
import { useQuery } from '@tanstack/react-query'

const Accounts = () => {
	const { data: allAccounts } = useQuery({
		queryKey: ['get all accounts'],
		queryFn: () => AccountsService.getAll(),
		select: ({ data }: { data: IAccount[] }) =>
			data.sort((a, b) => +a.code - +b.code),
	})

	return (
		<div>
			<CreateAccountDialog title="Create account" />
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
							<TableCell>{a.balance}$</TableCell>
							<TableCell>
								<ChangeAccountDialog defaultValue={a.name} id={a.id} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
export default Accounts
