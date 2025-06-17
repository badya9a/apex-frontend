import { axiosClassic } from '@/api/interceptors'

export const DashboardService = {
	async getPieChartData() {
		return axiosClassic.get('api/accounts/total')
	},
}
