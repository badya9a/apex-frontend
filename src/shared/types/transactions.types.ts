export interface ITransaction {
	content: {
		id: number
		leftAccountName: string
		rightAccountName: string
		description: string
		amount: number
	}[]
}
