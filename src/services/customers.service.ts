import { type IContact } from './../shared/types/contacts.types'
import axiosClassic from '@/api/interceptors'

export const CustomersService = {
	async getAll() {
		return axiosClassic.get<IContact[]>(`/api/contacts/customers`)
	},

	async getCustomersWithPagination({
		page,
		size,
	}: {
		page: number
		size: number
	}) {
		return axiosClassic.get<{ content: IContact[]; totalPages: number }>(
			`/api/contacts/customers/pages`,
			{
				params: {
					page,
					size,
				},
			}
		)
	},

	async getVendors() {
		return axiosClassic.get<IContact[]>(`/api/contacts/vendors`)
	},

	async getById(id: number) {
		return axiosClassic.get<IContact[]>(`/api/contacts/${id}`)
	},

	async createCustomer({
		type,
		companyName,
		firstName,
		lastName,
		email,
		phone,
		billingStreet,
		billingCity,
		billingZipCode,
		billingCountry,
	}: Omit<IContact, 'id'>) {
		return axiosClassic.post('/api/contacts', {
			type,
			companyName,
			firstName,
			lastName,
			email,
			phone,
			billingStreet,
			billingCity,
			billingZipCode,
			billingCountry,
		})
	},

	async updateCustomer({
		id,
		type,
		companyName,
		firstName,
		lastName,
		email,
		phone,
		billingStreet,
		billingCity,
		billingZipCode,
		billingCountry,
	}: IContact) {
		return axiosClassic.patch(`/api/contacts/${id}`, {
			type,
			companyName,
			firstName,
			lastName,
			email,
			phone,
			billingStreet,
			billingCity,
			billingZipCode,
			billingCountry,
		})
	},
}
