import { type ITransaction } from './../shared/types/transactions.types'
import axiosClassic from '@/api/interceptors'
import type {
	CreateBillWithTransactionProps,
	CreateInvoiceWithTransactionProps,
	IBill,
	IInvoice,
} from '@/shared/types/invoices.types'

export const InvoicesService = {
	async getAll({ page, size }: { page: number; size: number }) {
		return axiosClassic.get<{ content: IInvoice[]; totalPages: number }>(
			`/api/invoices`,
			{
				params: {
					page,
					size,
				},
			}
		)
	},

	async getBills({ page, size }: { page: number; size: number }) {
		return await axiosClassic.get<{ content: IBill[]; totalPages: number }>(
			'/api/bills',
			{
				params: {
					page,
					size,
				},
			}
		)
	},

	async getTransactions({ page, size }: { page: number; size: number }) {
		return axiosClassic.get<{ content: ITransaction[]; totalPages: number }>(
			`/api/transactions`,
			{
				params: {
					page,
					size,
				},
			}
		)
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

	async getBillNumber() {
		return axiosClassic.get<{ billNumber: string }>(
			'/api/bills/generate-number'
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

	async createBillWithTransaction({
		billRequest,
		transactionRequest,
	}: CreateBillWithTransactionProps) {
		return await axiosClassic.post('/api/bills/create-with-transaction', {
			billRequest,
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
		return await axiosClassic.patch('/api/invoices', {
			invoiceNumber,
			description,
		})
	},

	async editBill({
		description,
		billNumber,
	}: {
		billNumber: string
		description: string
	}) {
		return await axiosClassic.patch('/api/bills', {
			billNumber: billNumber,
			description,
		})
	},

	async editTransaction({
		description,
		id,
	}: {
		id: number
		description: string
	}) {
		return await axiosClassic.patch('/api/transactions', {
			id,
			description,
		})
	},
}
