import type { availableRoles } from '@/shared/types/user.types'
import type { JSX } from 'react'

export interface RoutesData {
	path: string
	element: React.LazyExoticComponent<() => JSX.Element>
	rolesToAccess: availableRoles[]
}
