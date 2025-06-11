import { type ITransaction } from './../shared/types/transactions.types'
import axiosClassic from '@/api/interceptors'
import type {
	CreateInvoiceWithTransactionProps,
	IInvoice,
} from '@/shared/types/invoices.types'

export const InvoicesService = {
	async getAll({ page, size }: { page: number; size: number }) {
		return axiosClassic.get<IInvoice[]>(`/api/invoices`, {
			params: {
				page,
				size,
			},
		})
	},

	async getTransactions({ page, size }: { page: number; size: number }) {
		return axiosClassic.get<ITransaction>(`/api/transactions`, {
			params: {
				page,
				size,
			},
		})
	},

	async createTransaction({
		transactionRequest,
	}: Pick<CreateInvoiceWithTransactionProps, 'transactionRequest'>) {
		return axiosClassic.post(`/api/transactions`, transactionRequest)
	},

	async getTransactionArrow({
		id,
		entryType,
	}: {
		id: number
		entryType: 'DEBIT' | 'CREDIT'
	}) {
		return axiosClassic.get<'UP' | 'DOWN'>('/api/accounts/arrow', {
			params: {
				id: id,
				entryType: entryType,
			},
		})
	},

	async getInvoiceNumber() {
		return axiosClassic.get<{ invoiceNumber: string }>(
			'/api/invoices/generate-number'
		)
	},

	async createInvoiceWithTransaction({
		invoiceRequest,
		transactionRequest,
	}: CreateInvoiceWithTransactionProps) {
		return await axiosClassic.post('/api/invoices/create-with-transaction', {
			invoiceRequest,
			transactionRequest,
		})
	},

	async editInvoice({
		description,
		invoiceNumber,
	}: {
		invoiceNumber: string
		description: string
	}) {
		return await axiosClassic.put('/api/invoices/edit', {
			invoiceNumber,
			description,
		})
	},
}
