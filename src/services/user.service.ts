import axiosClassic from '@/api/interceptors'
import type { availableRoles, IUser } from '@/shared/types/user.types'

export const UserService = {
	async getAll({ page, size }: { page: number; size: number }) {
		return axiosClassic.get<{ content: IUser[]; totalPages: number }>(
			`/api/admin/users/search`,
			{ params: { page, size } }
		)
	},

	async getUserProfileById() {
		return axiosClassic.get<IUser>('/api/users/me')
	},

	async resetUserPassword(id: string) {
		return axiosClassic.put<string>(`api/admin/users/reset-password`, {
			id,
		})
	},

	async changeUsersRole(id: string, roles: availableRoles[]) {
		return await axiosClassic.patch('/api/admin/users/update/roles', {
			publicId: id,
			roles,
		})
	},

	async changeUsersInfo(id: string, user: Omit<IUser, 'publicId'>) {
		return await axiosClassic.patch(`/api/admin/users/update/creds`, {
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
