import Cookies from 'js-cookie'

import axios from 'axios'
import { errorCatch, getContentType } from './api.helper'
import { AuthService } from '@/services/auth/auth.service'
import { removeTokensStorage } from '@/services/auth/auth.helper'

export const axiosClassic = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_ADDRESS,
	headers: getContentType(),
})

const instance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_ADDRESS,
	headers: getContentType(),
})
instance.interceptors.request.use((config) => {
	const accessToken = Cookies.get('accessToken')

	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

// instance.interceptors.response.use(
// 	(config) => config,
// 	async (error) => {
// 		const originalRequest = error.config

// 		if (
// 			(error.response.status === 401 ||
// 				errorCatch(error) === 'jwt expired' ||
// 				errorCatch(error) === 'jwt must be provided') &&
// 			error.config &&
// 			!error.config.isRetry
// 		) {
// 			originalRequest._isRetry = true
// 			try {
// 				await AuthService.getNewTokens()
// 				return axios.request(originalRequest)
// 			} catch (error) {
// 				if (errorCatch(error) === 'jwt expired') removeTokensStorage()
// 			}
// 		}

// 		throw error
// 	}
// )

export default instance
