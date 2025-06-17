import useAuth from '@/hooks/useAuth'
import { type availableRoles, ROLES } from '@/shared/types/user.types'
import { useEffect, type FC, type ReactNode } from 'react'
import { useNavigate } from 'react-router'

const CheckRole: FC<{
	children: ReactNode
	roles: availableRoles[]
}> = ({ children, roles }) => {
	const { user } = useAuth()

	const navigate = useNavigate()

	const Children = () => <>{children}</>

	useEffect(() => {
		if (user?.roles[0] === 'USER') navigate(`/profile/${user?.publicId}`)
		return
	}, [])

	useEffect(() => {
		if (!roles.includes(ROLES[user?.roles[0]])) {
			navigate('/404')
			return
		}
	}, [])

	if (roles.includes(ROLES[user?.roles[0]])) {
		return <Children />
	}
}
export default CheckRole
