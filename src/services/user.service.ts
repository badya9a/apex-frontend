import axiosClassic from '@/api/interceptors'
import type { availableRoles, IUser } from '@/shared/types/user.types'
import axios from 'axios'

export const UserService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IUser[]>(`/api/admin/users/search`)
	},

	async getUserProfileById(id: string) {
		return axiosClassic.get<IUser>('/api/users/me')
	},

	async resetUserPassword(id: string) {
		return axiosClassic.put<string>(`api/users/change-password`, {
			publicId: id,
		})
	},

	async changeUsersRole(id: string, roles: typeof availableRoles) {
		return await axiosClassic.put('/api/admin/users/update/roles', {
			publicId: id,
			roles,
		})
	},

	async changeUsersInfo(id: string, user: Omit<IUser, 'publicId'>) {
		return await axiosClassic.put(`/api/admin/users/update/creds`, {
			publicId: id,
			...user,
		})
	},

	async changeUserPassword(password: string) {
		return await axiosClassic.post(`/api/users/change-password`, {
			password,
		})
	},
}
