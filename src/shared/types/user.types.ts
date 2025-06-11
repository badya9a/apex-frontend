export enum ROLES {
	'ADMIN',
	'ACCOUNTANT',
	'VIEWER',
	'USER',
}

export const availableRoles = Object.values(ROLES)

export interface IUser {
	publicId: string
	email: string
	firstName: string
	lastName: string
	phone: number
	roles: typeof availableRoles
}
