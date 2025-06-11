import type { TypeBsIconName } from '@/shared/types/icon.types'
import type { FC } from 'react'
import * as BsIcons from 'react-icons/bs'

const BsIcon: FC<{ name: TypeBsIconName; size: number; color: string }> = ({
	color,
	name,
	size,
}) => {
	const IconComponent = BsIcons[name]

	return <IconComponent size={size} color={color} />
}
export default BsIcon
