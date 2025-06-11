import useAuth from '@/hooks/useAuth'
import { availableRoles, ROLES } from '@/shared/types/user.types'
import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router'

const CheckRole: FC<{
	children: ReactNode
	roles: (typeof availableRoles)[]
}> = ({ children, roles }) => {
	const { user } = useAuth()

	const navigate = useNavigate()

	const Children = () => <>{children}</>

	if (user?.roles[0] === 'USER') navigate(`/profile/${user?.publicId}`)

	if (roles.includes(user?.roles[0])) return <Children />
}
export default CheckRole
