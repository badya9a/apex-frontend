import { createBrowserRouter } from 'react-router'
import { routesLinks } from './routes.data'
import Layout from '@/components/layout/Layout'
import LoginPage from '@/components/screens/login/LoginPage'
import AuthProvider from '@/providers/AuthProvider'

export const router = createBrowserRouter([
	...routesLinks.map((route) => {
		return {
			path: route.path,
			element: (
				<AuthProvider roles={route.rolesToAccess}>
					<Layout>
						<route.element />
					</Layout>
				</AuthProvider>
			),
		}
	}),

	{
		path: '/login',
		element: <LoginPage />,
	},
])

export default router
