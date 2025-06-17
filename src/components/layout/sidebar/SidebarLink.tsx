import { cn } from '@/lib/utils'
import type { FC } from 'react'
import { NavLink } from 'react-router'

const SidebarLink: FC<{
	title: string
	isActive: boolean
	path: string
}> = ({ title, isActive, path }) => {
	return (
		<NavLink
			to={path}
			className={cn(
				'flex flex-row items-center justify-left p-4',
				isActive ? 'bg-gray-300 font-bold border-l-7 border-green-700' : ''
			)}
		>
			{title}
		</NavLink>
	)
}
export default SidebarLink
