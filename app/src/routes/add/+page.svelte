<script lang="ts">
	import MetricAdd from '$lib/components/metric-add.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();


</script>

<h1 class="mb-4">Add Metric</h1>

<MetricAdd metricTypes={data.metricTypes}></MetricAdd>
