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
	issueDate: Date
	dueDate: Date
	description: string
}

interface TransactionRequest {
	leftAccountId: number
	rightAccountId: number
	amount: number
	description: string
}

export interface CreateInvoiceWithTransactionProps {
	invoiceRequest: InvoiceRequest
	transactionRequest: TransactionRequest
}
