import { BsList } from 'react-icons/bs'
import { headerLinks } from './navbar.data'
import { NavLink } from 'react-router'
import BsIcon from '@/components/ui/BsIcon'
import useAuth from '@/hooks/useAuth'

const Navbar = () => {
	const { user } = useAuth()

	console.log(user)

	return (
		<div className="flex justify-between p-3 bg-black opacity-90">
			<div className="flex items-center text-white">
				<div className="flex gap-3">
					<NavLink to={`/dashboards`} className="flex gap-2 w-full">
						<img src="/logo.png" alt="logo" width={30} height={30} />
						<p className="w-32 flex justify-left font-bold text-[20px] min-w-42">
							APEX
						</p>
					</NavLink>
				</div>
				<BsList size={24} />
			</div>
			<div>
				<nav>
					<NavLink
						to={`/profile/${user?.publicId}`}
						className="flex rounded-[50%] w-[28px] h-[28px] bg-blue-950 text-xl items-center justify-center text-white"
					>
						{user?.email[0]}
					</NavLink>
				</nav>
			</div>
		</div>
	)
}
export default Navbar
