import Cookies from 'js-cookie'

import axios from 'axios'
import { getContentType } from './api.helper'

export const axiosClassic = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_ADDRESS,
	headers: getContentType(),
})

export const instance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_ADDRESS,
	headers: getContentType(),
})
instance.interceptors.request.use((config) => {
	const accessToken = Cookies.get('accessToken')

	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

export default instance
