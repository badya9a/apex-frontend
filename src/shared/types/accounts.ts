export interface IAccount {
	id: number
	code: string
	name: string
	type: typeof AccountType
	balance: number
	mutable: true
	contra: true
}

enum AccountType {
	ASSET,
	LIABILITY,
	EQUITY,
	REVENUE,
	EXPENSE,
}
