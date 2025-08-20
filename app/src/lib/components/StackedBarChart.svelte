<script lang="ts">
	import { Chart, registerables } from 'chart.js';
	import type { Metric } from '$lib/model/metric';
	import { getColorHex } from '$lib/utils/get-color-hex';
	import type { MetricType } from '$lib/model/metric-type';

	let {
		metrics,
		metricType
	}: {
		metrics: Metric[];
		metricType: MetricType
	} = $props();

	function chartAttachment(element: HTMLCanvasElement) {
		const chartData = prepareChartData();

		Chart.register(...registerables);

		let chartInstance: Chart | null = new Chart(element, {
			type: 'bar',
			data: chartData,
			options: {
				responsive: true,
				scales: {
					x: {
						stacked: true
					},
					y: {
						stacked: true,
						title: {
							display: true,
							text: metricType.unit
						}
					}
				},
				plugins: {
					title: {
						display: true,
						text: `${metricType.name} by Month`
					},
					legend: {
						display: false
					}
				}
			}
		});

		return () => {
			if (chartInstance) {
				chartInstance.destroy();
				chartInstance = null;
			}
		};
	}

	function prepareChartData() {
		const monthlyData = new Map<string, Metric[]>();

		metrics.forEach((metric) => {
			const date = new Date(metric.datetime);
			const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

			if (!monthlyData.has(monthKey)) {
				monthlyData.set(monthKey, []);
			}
			monthlyData.get(monthKey)!.push(metric);
		});

		const sortedMonths = Array.from(monthlyData.keys()).sort();
		const datasets: any[] = [];
		const backgroundColor = getColorHex(metricType.color);

		const allMetrics = Array.from(monthlyData.values()).flat();
		allMetrics.forEach((metric, index) => {
			const monthKey = `${new Date(metric.datetime).getFullYear()}-${String(new Date(metric.datetime).getMonth() + 1).padStart(2, '0')}`;

			datasets.push({
				label: `Entry ${index + 1}`,
				data: sortedMonths.map((month) => (month === monthKey ? metric.value : 0)),
				backgroundColor: backgroundColor + '80',
				borderColor: backgroundColor,
				borderWidth: 1
			});
		});

		return {
			labels: sortedMonths.map((month) => {
				const [year, monthNum] = month.split('-');
				return new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'short'
				});
			}),
			datasets
		};
	}
</script>

<div class="chart-container mb-4">
	<canvas {@attach chartAttachment}></canvas>
</div>

<style>
	.chart-container {
		position: relative;
		height: 400px;
		width: 100%;
	}
</style>
