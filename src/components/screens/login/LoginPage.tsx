import { useForm, type SubmitHandler } from 'react-hook-form'
import type { IAuthInput } from './auth.interface'
import { AuthService } from '@/services/auth/auth.service'
import AuthFields from './AuthFields'
import { useMutation } from '@tanstack/react-query'
import { redirect, useNavigate } from 'react-router'
import { saveToStorage } from '@/services/auth/auth.helper'

const LoginPage = () => {
	const navigate = useNavigate()

	const {
		register: registerInput,
		handleSubmit,
		formState,
	} = useForm<IAuthInput>({
		mode: 'onChange',
	})

	const { mutate, isPending } = useMutation({
		mutationFn: (data: { email: string; password: string }) =>
			AuthService.login(data),
		onSuccess: ({ data }) => {
			saveToStorage(data)
			navigate('/dashboards')
		},
	})

	const onSubmit: SubmitHandler<IAuthInput> = ({ email, password }) => {
		mutate({ email, password })
	}

	return (
		<div className="flex justify-center min-h-[100vh] items-center bg-black">
			<div className=" flex flex-col justify-center items-center w-[300px]">
				<section className="flex flex-col items-center text-white w-full">
					<img src="./logo.png" width={100} height={100} />
					<h1 className="text-3xl p-3 font-bold mb-3">Welcome</h1>
					<form onSubmit={handleSubmit(onSubmit)} className="w-full">
						<AuthFields
							formState={formState}
							register={registerInput}
							formType="login"
						/>
						<div className="flex items-center justify-center bg-[rgb(1c1c1c)] border-1 rounded-lg font-bold text-white mt-5 hover:opacity-80">
							<button
								type="submit"
								disabled={isPending}
								className="hover:cursor-pointer p-3 w-full h-full"
							>
								Login
							</button>
						</div>
					</form>
				</section>
			</div>
		</div>
	)
}

export default LoginPage
