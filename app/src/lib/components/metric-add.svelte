<script lang="ts">
	import type { MetricType } from '$lib/model/metric-type';
	import { format } from 'date-fns';
	import { enhance } from '$app/forms';

	let { metricTypes }: { metricTypes: MetricType[] } = $props();

	let selectedMetricTypeId = $state(metricTypes[0].id);
	let selectedMetricType = $derived(
		metricTypes.find((metricType) => metricType.id === selectedMetricTypeId)
	);
</script>

<form method="POST" use:enhance>
	<select name="metricTypeId" bind:value={selectedMetricTypeId}>
		{#each metricTypes as metricType}
			<option value={metricType.id}>
				{metricType.name}
			</option>
		{/each}
	</select>
	<input type="number" step=".01" name="value" />
	{selectedMetricType?.unit}
	<textarea name="note"></textarea>
	<input type="datetime-local" name="datetime" value={format(new Date(), "yyyy-MM-dd'T'HH:mm")} />
	<button type="submit">Add</button>
</form>
