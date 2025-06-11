import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../button'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import type { IContact } from '@/shared/types/contacts.types'
import { CustomersService } from '@/services/customers.service'
import Field from '../form-elements/Field'
import { validEmail } from '@/shared/regex'
import { toast } from 'sonner'
import { CustomerTypePicker } from '../combbox/CustomerTypePicker'

const CreateCustomerDialog = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IContact>({
		mode: 'onChange',
	})

	const [type, setType] = useState<'CUSTOMER' | 'VENDOR' | 'BOTH'>('BOTH')

	const { mutate, isPending } = useMutation({
		mutationFn: (data: IContact) =>
			CustomersService.createCustomer({ ...data }),
		onSuccess: () => {
			toast('Customer created successfully', { duration: 100 })
		},
	})

	const onSubmit: SubmitHandler<IContact> = ({
		billingCity,
		billingCountry,
		billingStreet,
		billingZipCode,
		companyName,
		email,
		firstName,
		lastName,
		phone,
	}) => {
		mutate({
			type,
			companyName,
			firstName,
			lastName,
			email,
			phone,
			billingStreet,
			billingCity,
			billingZipCode,
			billingCountry,
		})
	}

	return (
		<Dialog onOpenChange={() => reset()}>
			<form>
				<DialogTrigger asChild>
					<button className="p-3 bg-green-600 rounded-lg hover:cursor-pointer ">
						CREATE NEW CUSTOMER
					</button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] bg-gray-500">
					<DialogHeader>
						<DialogTitle>Create customer</DialogTitle>
						<DialogDescription>
							Create new customer here. Click save when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<CustomerTypePicker
							dataToPick={[
								{ name: 'CUSTOMER' },
								{ name: 'VENDOR' },
								{ name: 'BOTH' },
							]}
							picked={type}
							setPicked={setType}
							placeholder="Select type"
						/>
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
							error={errors.billingStreet}
						/>
						<Field
							{...register('billingStreet', {
								required: 'BillingStreet is required',
							})}
							placeholder="BillingStreet"
							type="text"
							error={errors.phone}
						/>
						<Field
							{...register('billingCity', {
								required: 'BillingCity is required',
							})}
							placeholder="BillingCity"
							type="text"
							error={errors.billingCity}
						/>
						<Field
							{...register('billingZipCode', {
								required: 'BillingZipCode is required',
							})}
							placeholder="BillingZipCode"
							type="text"
							error={errors.billingZipCode}
						/>
						<Field
							{...register('billingCountry', {
								required: 'BillingCountry is required',
							})}
							placeholder="BillingCountry"
							type="text"
							error={errors.billingCountry}
						/>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button
							type="submit"
							className="hover:cursor-pointer"
							disabled={isPending}
							onClick={handleSubmit(onSubmit)}
						>
							Create user
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	)
}

export default CreateCustomerDialog
