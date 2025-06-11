import { useState } from 'react'
import { sidebarLinks } from './sidebar.data'
import SidebarLink from './SidebarLink'
import useAuth from '@/hooks/useAuth'
import { ROLES } from '@/shared/types/user.types'

const Sidebar = () => {
	const [activeLink, setActiveLink] = useState('')

	const { user } = useAuth()

	const handleActiveLink = (title: string) => {
		setActiveLink(title)
	}

	return (
		<div className="flex flex-col min-w-42 border-r-1 border-black bg-gray-300">
			<ul>
				{sidebarLinks.map((link) =>
					link.rolesToAccess.includes(ROLES['ADMIN']) ? (
						<SidebarLink
							key={link.title}
							path={link.link}
							title={link.title}
							isActive={link.title === activeLink}
							handleActiveLink={handleActiveLink}
						/>
					) : null
				)}
			</ul>
		</div>
	)
}
export default Sidebar
