import { errorCatch } from '@/api/api.helper'
import {
	removeTokensStorage,
	saveTokensStorage,
} from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'
import type { availableRoles } from '@/shared/types/user.types'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { lazy, useEffect, type FC, type ReactNode } from 'react'
import { useNavigate } from 'react-router'

const DynamicCheckRole = lazy(() => import('./CheckRole'))

const AuthProvider: FC<{
	children: ReactNode
	roles: availableRoles[]
}> = ({ children, roles }) => {
	const navigate = useNavigate()

	const { mutate: logout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => AuthService.logout(),
		onSuccess: () => {
			removeTokensStorage()
			localStorage.removeItem('user')
		},
	})

	const { mutate: checkAuth } = useMutation({
		mutationFn: () => AuthService.getNewTokens(),
		onSuccess: ({ data }) =>
			saveTokensStorage({ accessToken: data.accessToken }),
		onError: (error) => {
			if (errorCatch(error) === 'jwt expired') {
				logout()
			}
			if (errorCatch(error) === 'Refresh token is missing') {
				logout()
			}
			navigate('/login')
		},
	})

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (!accessToken) checkAuth()
	}, [])

	return <DynamicCheckRole roles={roles}>{children}</DynamicCheckRole>
}
export default AuthProvider
