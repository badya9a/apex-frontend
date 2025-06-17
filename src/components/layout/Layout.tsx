import { useState, type FC, type ReactNode } from 'react'
import Sidebar from './sidebar/Sidebar'
import Navbar from './navbar/Navbar'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
	const [activeSidebar, setActiveSidebar] = useState(true)

	return (
		<div className="bg-gray-100">
			<Navbar setActiveSidebar={setActiveSidebar} />
			<div className="flex h-full">
				<Sidebar active={activeSidebar} />
				<div className="w-full p-6 h-full min-h-[100vh]">{children}</div>
			</div>
		</div>
	)
}
export default Layout
