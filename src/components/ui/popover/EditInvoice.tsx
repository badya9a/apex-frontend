import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { InvoicesService } from '@/services/invoices.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, type FC } from 'react'

export const EditInvoice: FC<{
	invoiceNumber: string
	defaultValue: string
}> = ({ invoiceNumber, defaultValue }) => {
	const [desc, setDesc] = useState(defaultValue)

	const queryClient = useQueryClient()

	const { mutate: editInvoice } = useMutation({
		mutationKey: ['edit invoice', invoiceNumber],
		mutationFn: ({ description }: { description: string }) =>
			InvoicesService.editInvoice({ invoiceNumber, description }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get all invoices'] })
		},
	})

	const handleSubmit = () => {
		editInvoice({ description: desc })
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">Edit</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80 bg-white">
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="leading-none font-medium">Dimensions</h4>
						<p className="text-muted-foreground text-sm">Edit invoice</p>
					</div>
					<div className="grid gap-2">
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="description">Description</Label>
							<Input
								id="description"
								defaultValue={defaultValue}
								value={desc}
								onChange={(e) => setDesc(e.target.value)}
								className="col-span-2 h-8 outline-none border-none"
							/>
						</div>
						<Button variant="outline" onClick={() => handleSubmit()}>
							Save
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
