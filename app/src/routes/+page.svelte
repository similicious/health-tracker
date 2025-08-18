<script lang="ts">
	import type { PageProps } from './$types';
	import { format } from 'date-fns';

	let { data }: PageProps = $props();
</script>

<h1 class="mb-4">Metrics</h1>

<div class="table-responsive mt-4">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th scope="col">Date & Time</th>
				<th scope="col">Type</th>
				<th scope="col">Value</th>
			</tr>
		</thead>
		<tbody>
			{#each data.metrics.items as metric}
				{@const metricType = data.metricTypesById[metric.metric_type]}
				<tr>
					<td>{format(metric.datetime, 'yyyy-MM-dd HH:mm')}</td>
					<td>
						<div class="d-flex align-items-center">
							<div class="color-swatch me-2" style="background-color: #{metricType.color};"></div>
							{metricType.name}
						</div>
					</td>
					<td>{metric.value}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.color-swatch {
		display: inline-block;
		width: 25px;
		height: 25px;
		border-radius: 100%;
	}
</style>
