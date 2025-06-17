import { type IContact } from './../shared/types/contacts.types'
import axiosClassic from '@/api/interceptors'

export const VendorsService = {
	async getAll() {
		return axiosClassic.get<IContact[]>(`/api/contacts/vendors`)
	},

	async getVendorsWithPagination({
		page,
		size,
	}: {
		page: number
		size: number
	}) {
		return axiosClassic.get<{ content: IContact[]; totalPages: number }>(
			'/api/contacts/vendors/pages',
			{
				params: {
					page,
					size,
				},
			}
		)
	},

	async getByPage({ page, size }: { page: number; size: number }) {
		return axiosClassic.get<IContact[]>('api/contacts/vendors/pages', {
			params: {
				page,
				size,
			},
		})
	},
}
