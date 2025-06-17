import type { IAuthResponse } from '@/shared/user.interface'
import { getContentType } from '@/api/api.helper'
import axiosClassic from '@/api/interceptors'
import type { IUser } from '@/shared/types/user.types'

export const AuthService = {
	async login({ email, password }: { email: string; password: string }) {
		return await axiosClassic.post<IAuthResponse>(`/api/auth/login`, {
			email,
			password,
		})
	},

	async register({
		email,
		firstName,
		lastName,
		phone,
		roles,
	}: Omit<IUser, 'publicId'>) {
		return await axiosClassic.post(`/api/auth/register`, {
			email,
			firstName,
			lastName,
			phone,
			roles,
		})
	},

	async logout() {
		return axiosClassic.post('api/auth/logout')
		// removeTokensStorage()
		// localStorage.removeItem('user')
	},

	async getNewTokens() {
		return await axiosClassic.post<{ accessToken: string; tokenType: string }>(
			'api/auth/refresh',
			{
				headers: getContentType(),
			}
		)
	},
}
