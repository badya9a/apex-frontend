import axios from 'axios'
import { removeTokensStorage, saveToStorage } from './auth.helper'
import type { IAuthResponse } from '@/shared/user.interface'
import Cookies from 'js-cookie'
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
	}: Omit<IUser, 'id'>) {
		return await axiosClassic.post(`/api/auth/register`, {
			email,
			firstName,
			lastName,
			phone,
			roles,
		})
	},

	logout() {
		removeTokensStorage()
	},

	async getNewTokens() {
		return await axiosClassic.post<{ accessToken: string; tokenType: string }>(
			'/auth/refresh',
			{
				headers: getContentType(),
			}
		)
	},
}
