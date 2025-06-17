import { lazy } from 'react'
import type { RoutesData } from './routes.interface'
import { ROLES } from '@/shared/types/user.types'

const DashBoards = lazy(
	() => import('../components/screens/dashboard/DashboardsPage')
)
const InvoicesPage = lazy(
	() => import('../components/screens/invoices/InvoicesPage')
)

const Workers = lazy(() => import('../components/screens/workers/Workers'))
const TransactionsPage = lazy(
	() => import('../components/screens/transactions/Transactions')
)
const AccountsPage = lazy(
	() => import('../components/screens/accounts/Accounts')
)
const CustomersPage = lazy(
	() => import('../components/screens/customers/Customers')
)
const BillsPage = lazy(() => import('../components/screens/bills/Bills'))
const SingleWorkerProfile = lazy(
	() => import('../components/screens/workers/SingleWorkerProfile')
)
const VendorsPage = lazy(
	() => import('../components/screens/vendors/VendorsPage')
)

export const routesLinks: RoutesData[] = [
	{
		element: DashBoards,
		path: '/',
		rolesToAccess: [ROLES['ADMIN'], ROLES['ACCOUNTANT'], ROLES['VIEWER']],
	},
	{
		element: InvoicesPage,
		path: '/invoices',
		rolesToAccess: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.VIEWER],
	},
	{
		element: Workers,
		path: '/workers',
		rolesToAccess: [ROLES.ADMIN],
	},
	{
		element: TransactionsPage,
		path: '/transactions',
		rolesToAccess: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.VIEWER],
	},
	{
		element: AccountsPage,
		path: '/accounts',
		rolesToAccess: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.VIEWER],
	},
	{
		element: CustomersPage,
		path: '/customers',
		rolesToAccess: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.VIEWER],
	},
	{
		element: BillsPage,
		path: '/bills',
		rolesToAccess: [ROLES.ADMIN, ROLES.ACCOUNTANT],
	},
	{
		element: SingleWorkerProfile,
		path: '/profile/:workerId',
		rolesToAccess: [ROLES.ADMIN, ROLES.USER, ROLES.ACCOUNTANT, ROLES.VIEWER],
	},
	{
		element: VendorsPage,
		path: '/vendors',
		rolesToAccess: [ROLES.ADMIN, ROLES.ACCOUNTANT],
	},
	{
		element: VendorsPage,
		path: '/vendors/:vendorId',
		rolesToAccess: [ROLES.ADMIN, ROLES.ACCOUNTANT],
	},
]
