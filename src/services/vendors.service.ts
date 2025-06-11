import axiosClassic from '@/api/interceptors'
import type { IVendor } from '@/shared/types/vendors.types'

export const VendorsService = {
	async getAll() {
		return axiosClassic.get<IVendor[]>(`/api/contacts/vendors`)
	},
}
