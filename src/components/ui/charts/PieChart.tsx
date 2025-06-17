'use client'
import { Pie, PieChart } from 'recharts'

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

const chartConfig = {
	ASSET: {
		label: 'ASSET',
		color: 'hsl(var(--chart-1))',
	},
	EQUITY: {
		label: 'EQUITY',
		color: 'hsl(var(--chart-2))',
	},
	EXPENSES: {
		label: 'EXPENSE',
		color: 'hsl(var(--chart-3))',
	},
	LIABILITY: {
		label: 'LIABILITY',
		color: 'hsl(var(--chart-4))',
	},
	REVENUE: {
		label: 'REVENUE',
		color: 'hsl(var(--chart-5))',
	},
} satisfies ChartConfig

export function PieChartComponent() {
	const { data } = useQuery({
		queryKey: ['get pie chart data'],
		queryFn: () => DashboardService.getPieChartData(),
		select: (data) => data.data,
	})

	const [data2, setData2] = useState<
		{ name: string; amount: number; fill: string }[] | []
	>([])

	useEffect(() => {
		if (data) {
			setData2([
				{ name: 'ASSET', amount: data.ASSET, fill: `var(--color-ASSET)` },
				{ name: 'REVENUE', amount: data.REVENUE, fill: `var(--color-REVENUE)` },
				{
					name: 'EXPENSES',
					amount: data.EXPENSE,
					fill: `var(--color-EXPENSE)`,
				},
				{
					name: 'LIABILITY',
					amount: data.LIABILITY,
					fill: `var(--color-LIABILITY)`,
				},
				{ name: 'EQUITY', amount: data.EQUITY, fill: `var(--color-EQUITY)` },
			])
		}
	}, [data])

	return (
		<Card className="flex flex-col border-none rounded-none h-full w-full">
			<CardHeader className="items-center pb-0">
				<CardTitle>All assets</CardTitle>
				<CardDescription>January - June 2025</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0 h-full w-full">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[400px]"
				>
					<PieChart className="h-[500px]">
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							className="h-[500px]"
							data={data2 ? data2 : []}
							dataKey="amount"
							nameKey="name"
							innerRadius={60}
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="leading-none text-muted-foreground">
					Showing all assets
				</div>
			</CardFooter>
		</Card>
	)
}
