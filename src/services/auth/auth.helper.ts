import type { IAuthResponse, ITokens } from '@/shared/user.interface'
import Cookies from 'js-cookie'

export const saveTokensStorage = (data: ITokens) => {
	Cookies.set('accessToken', data.accessToken)
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}

export const removeTokensStorage = () => {
	Cookies.remove('accessToken')
}
