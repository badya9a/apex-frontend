import { type FC } from 'react'
import { sidebarLinks } from './sidebar.data'
import SidebarLink from './SidebarLink'
import useAuth from '@/hooks/useAuth'
import { ROLES } from '@/shared/types/user.types'
import { useLocation } from 'react-router'

const Sidebar: FC<{
	active: boolean
}> = ({ active }) => {
	const location = useLocation()

	const { user } = useAuth()

	return active ? (
		<div className="flex flex-col min-w-42 border-r-1 border-black bg-gray-300">
			<ul>
				{sidebarLinks.map((link) =>
					link.rolesToAccess.includes(ROLES[user.roles[0]]) ? (
						<SidebarLink
							key={link.title}
							path={link.link}
							title={link.title}
							isActive={location.pathname === link.link}
						/>
					) : null
				)}
			</ul>
		</div>
	) : null
}
export default Sidebar
