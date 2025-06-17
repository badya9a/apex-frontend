import { BarChartComponent } from '@/components/ui/charts/BarChart'
import { InvoicesChart } from '@/components/ui/charts/InvoicesChart'
import { PieChartComponent } from '@/components/ui/charts/PieChart'

const Dashboard = () => {
	return (
		<div className="h-full">
			<h1 className="font-bold text-3xl">APEX</h1>
			<section className="w-full my-[30px]">
				<div className="grid grid-rows-2 grid-cols-3 gap-4">
					<div className="row-span-1 col-span-1 bg-white flex items-center justify-center">
						<InvoicesChart />
					</div>
					<div className="row-span-1 col-span-1 bg-white  min-h-[200px] flex items-center justify-center">
						<PieChartComponent />
					</div>
					<div className="row-span-1 col-span-1 bg-white min-h-[200px] flex items-center justify-center">
						<BarChartComponent />
					</div>
				</div>
			</section>
		</div>
	)
}
export default Dashboard
