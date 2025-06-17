import type { IUser } from '@/shared/types/user.types'
import { getStoreLocal } from '@/utils/local-storage'

const useAuth = (): { user: IUser } => {
	const user: IUser = getStoreLocal('user')

	return { user }
}
export default useAuth
