import { useQuery } from '@tanstack/react-query'
import { UserService } from '@/services/user.service'
import ChangeUserPassword from '@/components/ui/dialog/ChangeRolesDialog'

const SingleWorkerProfile = () => {
	const { data: userInfo } = useQuery({
		queryKey: ['get user profile'],
		queryFn: () => UserService.getUserProfileById(),
		select: (data) => data.data,
	})

	return (
		<div className="flex flex-col gap-4">
			<label>
				Email
				<input
					placeholder="Email"
					type="email"
					className="p-3 border-b-1 border-b-blue-600 border-r-1 border-r-blue-600 w-full rounded-lg outline-none"
					defaultValue={userInfo?.email}
				/>
			</label>
			<div className="flex w-full gap-3">
				<label className="w-full">
					First Name
					<input
						placeholder="First Name"
						type="text"
						className="p-3 border-b-1 border-b-blue-600 border-r-1 border-r-blue-600 w-full rounded-lg outline-none"
						defaultValue={userInfo?.firstName}
					/>
				</label>
				<label className="w-full">
					Last Name
					<input
						placeholder="Last Name"
						type="text"
						className="p-3 border-b-1 border-b-blue-600 border-r-1 border-r-blue-600 w-full rounded-lg outline-none"
						defaultValue={userInfo?.lastName}
					/>
				</label>
			</div>
			<label>
				Phone
				<input
					placeholder="Phone"
					type="tel"
					className="p-3 border-b-1 border-b-blue-600 border-r-1 border-r-blue-600 w-full rounded-lg outline-none"
					defaultValue={userInfo?.phone}
				/>
			</label>
			<div className="flex gap-4">
				<ChangeUserPassword />
			</div>
		</div>
	)
}
export default SingleWorkerProfile
