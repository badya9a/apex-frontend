'use client'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

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
import { useQuery } from '@tanstack/react-query'
import { DashboardService } from '@/services/accounts.service'
import { useEffect, useState } from 'react'

export const description = 'A bar chart with a custom label'

const chartConfig = {
	amount: {
		label: 'Amount',
		color: 'var(--chart-2)',
	},
	label: {
		color: 'var(--background)',
	},
} satisfies ChartConfig

export function BarChartComponent() {
	const { data } = useQuery({
		queryKey: ['get bar chart data'],
		queryFn: () => DashboardService.getPieChartData(),
		select: (data) => data.data,
	})

	const [data2, setData2] = useState<{ name: string; amount: number }[] | []>(
		[]
	)

	useEffect(() => {
		if (data) {
			setData2([
				{ name: 'ASSET', amount: data.ASSET },
				{ name: 'REVENUE', amount: data.REVENUE },
				{ name: 'EXPENSES', amount: data.EXPENSE },
				{ name: 'LIABILITY', amount: data.LIABILITY },
				{ name: 'EQUITY', amount: data.EQUITY },
			])
		}
	}, [data])

	return (
		<Card className="flex flex-col border-none rounded-none h-full w-full">
			<CardHeader>
				<CardTitle>Assets</CardTitle>
				<CardDescription>January - June 2025</CardDescription>
			</CardHeader>
			<CardContent className="h-full">
				<ChartContainer config={chartConfig} className="h-full w-full">
					<BarChart
						className="h-full"
						accessibilityLayer
						data={data2 ? data2 : []}
						layout="vertical"
						margin={{
							right: 30,
							left: 70,
						}}
					>
						<CartesianGrid horizontal={false} />
						<YAxis
							dataKey="name"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
							hide
						/>
						<XAxis dataKey="amount" type="number" hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Bar
							dataKey="amount"
							layout="vertical"
							fill="var(--color-desktop)"
							radius={4}
						>
							<LabelList
								dataKey="name"
								position="left"
								offset={8}
								className="fill-(--color-label)"
								fontSize={12}
							/>
							<LabelList
								dataKey="amount"
								position="right"
								offset={2}
								className="fill-foreground"
								fontSize={10}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="text-muted-foreground leading-none">
					Showing total assets for the last 6 months
				</div>
			</CardFooter>
		</Card>
	)
}
