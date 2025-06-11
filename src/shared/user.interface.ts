import type { IUser } from './types/user.types'

export interface ITokens {
	accessToken: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}
