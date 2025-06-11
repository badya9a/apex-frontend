import { errorCatch } from '@/api/api.helper'
import LoginPage from '@/components/screens/login/LoginPage'
import useAuth from '@/hooks/useAuth'
import { saveTokensStorage, saveToStorage } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'
import type { availableRoles, ROLES } from '@/shared/types/user.types'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { lazy, useEffect, type FC, type ReactNode } from 'react'
import { useLocation } from 'react-router'

const DynamicCheckRole = lazy(() => import('./CheckRole'))

const AuthProvider: FC<{
	children: ReactNode
	roles: typeof availableRoles
}> = ({ children, roles }) => {
	console.log(roles)
	const { user } = useAuth()

	const { mutate: checkAuth } = useMutation({
		mutationFn: () => AuthService.getNewTokens(),
		onSuccess: ({ data }) =>
			saveTokensStorage({ accessToken: data.accessToken }),
		onError: (error) => {
			if (errorCatch(error) === 'jwt expired') {
				AuthService.logout()
			}
		},
	})

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (!accessToken) checkAuth()
	}, [])

	return roles.length ? (
		<>{children}</>
	) : (
		<DynamicCheckRole roles={roles}>{children}</DynamicCheckRole>
	)
}
export default AuthProvider
