import axiosClassic from '@/api/interceptors'
import type { IAccount } from '@/shared/types/accounts'

export const AccountsService = {
	async getAll() {
		return axiosClassic.get<IAccount[]>(`/api/accounts`)
	},

	async deleteById(id: number) {
		return axiosClassic.delete(`/api/accounts/${id}`)
	},

	async editAccount(id: number, newName: string) {
		return axiosClassic.patch(`api/accounts/${id}`, { newName: newName })
	},

	async createAccount({ name, type }: { name: string; type: string }) {
		return axiosClassic.post('/api/accounts', {
			name,
			type,
		})
	},
}

export const DashboardService = {
	async getPieChartData() {
		return axiosClassic.get('api/accounts/total')
	},

	async getAccountByType(type: 'ASSET' | 'EXPENSE') {
		return axiosClassic.get(`/api/accounts/total/${type}`)
	},
}
