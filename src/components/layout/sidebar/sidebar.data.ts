import { availableRoles, ROLES } from '@/shared/types/user.types'

export interface sidebarLinks {
	title: string
	link: string
	rolesToAccess: typeof availableRoles
}

export const sidebarLinks: sidebarLinks[] = [
	{
		title: 'Dashboards',
		link: '/dashboards',
		rolesToAccess: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.VIEWER],
	},
	{
		title: 'Invoices',
		link: '/invoices',
		rolesToAccess: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.VIEWER],
	},
	{
		title: 'Bills',
		link: '/bills',
		rolesToAccess: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.VIEWER],
	},
	{
		title: 'Workers',
		link: '/workers',
		rolesToAccess: [ROLES.ADMIN],
	},
	{
		title: 'Vendors',
		link: '/vendors',
		rolesToAccess: [ROLES.ADMIN, ROLES.ACCOUNTANT],
	},
	{
		title: 'Customers',
		link: '/customers',
		rolesToAccess: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.VIEWER],
	},
	{
		title: 'Accounts',
		link: '/accounts',
		rolesToAccess: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.VIEWER],
	},
	{
		title: 'Transactions',
		link: '/transactions',
		rolesToAccess: [ROLES.ADMIN, ROLES.ACCOUNTANT],
	},
]
