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
import { useState, type FC } from 'react'
import type { IContact } from '@/shared/types/contacts.types'
import { CustomersService } from '@/services/customers.service'
import Field from '../form-elements/Field'
import { validEmail } from '@/shared/regex'
import { toast } from 'sonner'
import { CustomerTypePicker } from '../combbox/CustomerTypePicker'

const CreateCustomerDialog: FC<{
	title: string
	formType: 'create' | 'update'
	contact?: IContact
}> = ({ title, formType, contact }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IContact>({
		defaultValues: {
			email: contact?.email ? contact?.email : '',
			firstName: contact?.firstName ? contact?.firstName : '',
			lastName: contact?.lastName ? contact?.lastName : '',
			phone: contact?.phone ? contact?.phone : '',
			billingStreet: contact?.billingStreet ? contact?.billingStreet : '',
			billingCity: contact?.billingCity ? contact?.billingCity : '',
			billingZipCode: contact?.billingZipCode ? contact?.billingZipCode : '',
			billingCountry: contact?.billingCountry ? contact?.billingCountry : '',
		},
		mode: 'onChange',
	})

	const [open, setOpen] = useState(false)

	const [type, setType] = useState<'CUSTOMER' | 'VENDOR' | 'BOTH'>('BOTH')

	const { mutate: updateCustomer } = useMutation({
		mutationFn: (data: IContact) =>
			CustomersService.updateCustomer({ ...data }),
		onSuccess: () => {
			toast('Customer updated successfully', { duration: 100 })
		},
	})

	const { mutate: createCustomer, isPending } = useMutation({
		mutationFn: (data: Omit<IContact, 'id'>) =>
			CustomersService.createCustomer({ ...data }),
		onSuccess: () => {
			toast('Customer created successfully', { duration: 3000 })
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
		formType === 'create'
			? createCustomer({
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
			: updateCustomer({
					id: contact?.id!,
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

	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen)
		if (!isOpen) {
			// Reset to first page when dialog closes
			reset()
		}
	}

	return (
		<Dialog onOpenChange={handleOpenChange} open={open}>
			<form>
				<DialogTrigger asChild>
					<button className="p-3 bg-green-600 rounded-lg hover:cursor-pointer ">
						{title.toUpperCase()}
					</button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] bg-gray-500">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>
							{title} here. Click save when you&apos;re done.
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
							pattern="/^(\+\d{1,3}\s?)?(\(?\d{1,4}\)?[\s.-]?)?\d{3,4}[\s.-]?\d{3,4}$/"
							placeholder="Phone number"
							type="text"
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
						<div onClick={() => handleOpenChange(false)}>
							<Button
								type="submit"
								className="hover:cursor-pointer"
								disabled={isPending}
								onClick={handleSubmit(onSubmit)}
							>
								{formType === 'create' ? 'Create' : 'Update'}
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	)
}

export default CreateCustomerDialog
