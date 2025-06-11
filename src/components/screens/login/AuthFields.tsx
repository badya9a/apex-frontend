import Field from '@/components/ui/form-elements/Field'
import { validEmail } from '@/shared/regex'
import type { IUser } from '@/shared/types/user.types'
import type { FC } from 'react'
import type { UseFormRegister } from 'react-hook-form'

interface IAuthFields {
	register: UseFormRegister<any>
	formState: any
	formType: 'login' | 'register' | 'edit' | 'editRoles'
	user?: IUser
}

const AuthFields: FC<IAuthFields> = ({
	register,
	formState: { errors },
	formType,
}) => {
	return (
		<div className="flex flex-col gap-4">
			{formType === 'editRoles' ? null : (
				<Field
					{...register('email', {
						required: 'Email is required',
						pattern: {
							value: validEmail,
							message: 'Please enter a valid email',
						},
					})}
					placeholder="Email"
					error={errors.email}
				/>
			)}
			{formType === 'edit' || formType === 'editRoles' ? null : (
				<Field
					{...register('password', {
						required: 'Password is required',
						minLength: {
							value: 8,
							message: 'Password should be at least 8 characters',
						},
					})}
					placeholder="Password"
					type="password"
					error={errors.password}
				/>
			)}
			{formType === 'login' || formType === 'editRoles' ? null : (
				<>
					<div className="flex gap-5">
						<Field
							{...register('firstName', {
								required: 'First name is required',
							})}
							placeholder="First name"
							type="text"
							error={errors.firstName}
						/>
						<Field
							{...register('lastName', {
								required: 'Last name is required',
							})}
							placeholder="Last name"
							type="text"
							error={errors.lastName}
						/>
					</div>
					<Field
						{...register('phone', {
							required: 'Phone is required',
						})}
						placeholder="Phone number"
						type="tel"
						error={errors.phone}
					/>
				</>
			)}
		</div>
	)
}
export default AuthFields
