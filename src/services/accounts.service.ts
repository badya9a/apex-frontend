import axiosClassic from '@/api/interceptors'
import type { IAccount } from '@/shared/types/accounts'

export const AccountsService = {
	async getAll() {
		return axiosClassic.get<IAccount[]>(`/api/accounts`)
	},

	async deleteById(id: number) {
		return axiosClassic.delete(`/api/accounts/${id}`)
	},
}
