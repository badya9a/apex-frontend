import type { FC, ReactNode } from 'react'
import type { LayoutProps } from './Layout.interface'
import Sidebar from './sidebar/Sidebar'
import Navbar from './navbar/Navbar'
import { Outlet } from 'react-router'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="bg-gray-100">
			<Navbar />
			<div className="flex h-full">
				<Sidebar />
				<div className="w-full p-6 h-full min-h-[100vh]">{children}</div>
			</div>
		</div>
	)
}
export default Layout
