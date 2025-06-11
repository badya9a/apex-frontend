import { forwardRef } from 'react'
import type { IField } from './form.interface'

const Field = forwardRef<HTMLInputElement, IField>(
	({ defaultValue, placeholder, error, type = 'text', ...rest }, ref) => {
		return (
			<div className="flex flex-col">
				<label>
					{placeholder}
					<input
						placeholder={placeholder}
						type={type}
						ref={ref}
						{...rest}
						className="p-3 border-b-1 border-b-blue-600 border-r-1 border-r-blue-600 w-full rounded-lg outline-none"
						defaultValue={defaultValue}
					/>
				</label>
				{error && <div className="text-red-600">{error.message}</div>}
			</div>
		)
	}
)

export default Field
