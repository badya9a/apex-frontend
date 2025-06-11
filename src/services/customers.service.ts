import { type IContact } from './../shared/types/contacts.types'
import axiosClassic from '@/api/interceptors'

export const CustomersService = {
	async getAll() {
		return axiosClassic.get<IContact[]>(`/api/contacts/customers`)
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
	}: IContact) {
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
}
