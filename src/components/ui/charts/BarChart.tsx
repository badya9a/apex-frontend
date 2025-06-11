'use client'

import { TrendingUp } from 'lucide-react'
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
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
	{
		browser: 'chrome',
		visitors: 186,
		mobVisitors: 80,
	},
	{
		browser: 'safari',
		visitors: 120,
		mobVisitors: 80,
	},
]

const chartConfig = {
	chrome: {
		label: 'Chrome',
		color: 'hsl(var(--chart-1))',
	},
	safari: {
		label: 'Safari',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig

export function BarChartComponent() {
	return (
		<Card className="border-none rounded-none h-full">
			<CardHeader>
				<CardTitle>Bar Chart - Mixed</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout="vertical"
						margin={{
							left: 0,
						}}
					>
						<YAxis
							dataKey="browser"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) =>
								chartConfig[value as keyof typeof chartConfig]?.label
							}
						/>
						<XAxis dataKey="visitors" type="number" hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<ChartLegend content={<ChartLegendContent />} />
						<Bar dataKey="visitors" stackId="a" fill="var(--color-chrome)" />
						<Bar dataKey="mobVisitors" stackId="a" fill="var(--color-safari)" />
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total visitors for the last 6 months
				</div>
			</CardFooter>
		</Card>
	)
}
