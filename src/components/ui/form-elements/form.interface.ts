import type { InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

export interface IFieldProps {
	placeholder: string
	error?: FieldError | undefined
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface IField extends TypeInputPropsField {}
