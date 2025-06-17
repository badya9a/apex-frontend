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

export const EditTransaction: FC<{
	id: number
	defaultValue: string
}> = ({ id, defaultValue }) => {
	const [desc, setDesc] = useState(defaultValue)

	const queryClient = useQueryClient()

	const { mutate: editBill } = useMutation({
		mutationKey: ['edit transaction desc', id],
		mutationFn: ({ description }: { description: string }) =>
			InvoicesService.editTransaction({ id, description }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get all bills'] })
		},
	})

	const handleSubmit = () => {
		editBill({ description: desc })
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
						<p className="text-muted-foreground text-sm">Edit transaction</p>
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
