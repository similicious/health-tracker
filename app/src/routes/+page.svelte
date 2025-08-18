<script lang="ts">
	import MetricAdd from '$lib/components/metric-add.svelte';
	import type { PageProps } from './$types';
	import { format } from 'date-fns';

	let { data }: PageProps = $props();
</script>

<h1>Metrics</h1>

<MetricAdd metricTypes={data.metricTypes}></MetricAdd>

<ul>
	{#each data.metrics.items as metric}
		{@const metricType = data.metricTypesById[metric.metric_type]}
		<li>
			{format(metric.datetime, 'yyyy-MM-dd HH:mm')}
			<div class="color-swatch" style="background-color: #{metricType.color};"></div>
			{metricType.name}
			{metric.value}
		</li>
	{/each}
</ul>

<style>
	.color-swatch {
		display: inline-block;
		width: 25px;
		height: 25px;
		border-radius: 100%;
	}
</style>
