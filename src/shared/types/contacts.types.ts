export interface IContact {
	type: 'CUSTOMER' | 'VENDOR' | 'BOTH'
	companyName: string
	firstName: string
	lastName: string
	email: string
	phone: string
	billingStreet: string
	billingCity: string
	billingZipCode: string
	billingCountry: string
	id: number
}
