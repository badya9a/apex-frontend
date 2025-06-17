export interface IAccount {
	id: number
	code: string
	name: string
	type: string
	balance: number
	mutable: true
	contra: true
}
