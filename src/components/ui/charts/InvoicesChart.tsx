'use client'

import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { useQueries } from '@tanstack/react-query'
import { DashboardService } from '@/services/accounts.service'
import { useEffect, useState } from 'react'

const chartConfig = {
	ASSETS: {
		label: 'ASSETS',
		color: 'hsl(var(--chart-1))',
	},
	EXPENSE: {
		label: 'EXPENSE',
		color: 'hsl(99, 98%, 37%)',
	},
} satisfies ChartConfig

export function InvoicesChart() {
	const { data } = useQueries({
		queries: [
			{
				queryKey: ['get assets'],
				queryFn: () => DashboardService.getAccountByType('ASSET'),
			},
			{
				queryKey: ['get expenses'],
				queryFn: () => DashboardService.getAccountByType('EXPENSE'),
			},
		],
		combine: (results) => {
			return {
				data: results.map((result) => result.data),
				pending: results.some((result) => result.isPending),
			}
		},
	})

	const [data2, setData2] = useState<{ name: string; amount: number }[] | []>(
		[]
	)

	useEffect(() => {
		if (data.length) {
			setData2([
				{ name: 'ASSETS', amount: +data[0]?.data! },
				{ name: 'EXPENSE', amount: +data[1]?.data! },
			])
		}
	}, [data])

	console.log(data2)
	console.log(data)

	return (
		<Card className="flex flex-col border-none rounded-none h-full w-full">
			<CardHeader>
				<CardTitle>Assets and expense</CardTitle>
				<CardDescription>January - June 2025</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={data2 ? data2 : []}
						layout="vertical"
						margin={{
							left: 10,
						}}
					>
						<YAxis
							dataKey="name"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) =>
								chartConfig[value as keyof typeof chartConfig]?.label
							}
						/>
						<XAxis dataKey="amount" type="number" hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar dataKey="amount" layout="vertical" radius={5} />
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="leading-none text-muted-foreground">
					Showing assets and expense
				</div>
			</CardFooter>
		</Card>
	)
}
