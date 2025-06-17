export interface IInvoice {
	invoiceNumber: string
	customer: string
	issueDate: Date
	dueDate: Date
	description: string
	amount: number
	status: 'ISSUED' | 'PAID'
}

interface InvoiceRequest {
	customerId: number
	invoiceNumber: string
	amount: number
	issueDate: string
	dueDate: string
	description: string
}

interface TransactionRequest {
	leftAccountId: number
	rightAccountId: number
	amount: number
	description: string
}

interface BillRequest {
	vendorId: number
	billNumber: string
	amount: number
	issueDate: string
	dueDate: string
	description: string
}

export interface CreateInvoiceWithTransactionProps {
	invoiceRequest: InvoiceRequest
	transactionRequest: TransactionRequest
}

export interface CreateBillWithTransactionProps {
	billRequest: BillRequest
	transactionRequest: TransactionRequest
}

export interface IBill {
	billNumber: string
	vendor: string
	issueDate: Date
	dueDate: Date
	description: string
	amount: number
	status: string
}
