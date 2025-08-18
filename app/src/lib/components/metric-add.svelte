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

<form method="POST" use:enhance class="row g-3">
	<div class="col-md-6">
		<label for="metricTypeId" class="form-label">Metric Type</label>
		<select
			name="metricTypeId"
			bind:value={selectedMetricTypeId}
			class="form-select"
			id="metricTypeId"
		>
			{#each metricTypes as metricType}
				<option value={metricType.id}>
					{metricType.name}
				</option>
			{/each}
		</select>
	</div>
	<div class="col-md-6">
		<label for="value" class="form-label">Value</label>
		<div class="input-group">
			<input type="number" step=".01" name="value" class="form-control" id="value" />
			<span class="input-group-text">{selectedMetricType?.unit}</span>
		</div>
	</div>
	<div class="col-12">
		<label for="note" class="form-label">Note</label>
		<textarea name="note" class="form-control" id="note" rows="3"></textarea>
	</div>
	<div class="col-md-6">
		<label for="datetime" class="form-label">Date & Time</label>
		<input
			type="datetime-local"
			name="datetime"
			value={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
			class="form-control"
			id="datetime"
		/>
	</div>
	<div class="col-12">
		<button type="submit" class="btn btn-primary">Add Metric</button>
	</div>
</form>
