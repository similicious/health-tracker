<script lang="ts">
	import type { PageData } from './$types';
	import { getColorHex } from '$lib/utils/get-color-hex';

	let { data }: { data: PageData } = $props();

	function formatDateTime(datetime: string) {
		return new Date(datetime).toLocaleString();
	}
</script>

<svelte:head>
	<title>{data.metricType.name} - Health Tracker</title>
</svelte:head>

<div class="d-flex justify-content-between align-items-center mb-4">
	<div class="d-flex align-items-center">
		<div
			class="me-3 rounded-circle"
			style="width: 40px; height: 40px; background-color: {getColorHex(data.metricType.color)}"
		></div>
		<div>
			<h1 class="h2 mb-1">{data.metricType.name}</h1>
			<p class="text-muted mb-0">{data.metricType.description}</p>
		</div>
	</div>
	<a href="/add?type={data.metricType.id}" class="btn btn-primary">
		Add {data.metricType.name}
	</a>
</div>

{#if data.metrics.length === 0}
	<div class="alert alert-info">
		<h4>No metrics recorded yet</h4>
		<p class="mb-0">Start tracking by adding your first {data.metricType.name} metric.</p>
	</div>
{:else}
	<div class="row">
		{#each data.metrics as metric}
			<div class="col-md-6 col-lg-4 mb-3">
				<div class="card h-100">
					<div class="card-body">
						<div class="d-flex justify-content-between align-items-start mb-2">
							<span class="badge bg-secondary">{formatDateTime(metric.datetime)}</span>
						</div>
						<h5 class="card-title">
							{metric.value}
							{data.metricType.unit}
						</h5>
						{#if metric.note}
							<p class="card-text text-muted small">{metric.note}</p>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
