export const ROLES = {
	ADMIN: 'ADMIN',
	ACCOUNTANT: 'ACCOUNTANT',
	VIEWER: 'VIEWER',
	USER: 'USER',
} as const

export type availableRoles = (typeof ROLES)[keyof typeof ROLES]

export interface IUser {
	publicId: string
	email: string
	firstName: string
	lastName: string
	phone: number
	roles: availableRoles[]
}
