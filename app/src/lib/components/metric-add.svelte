<script lang="ts">
	import type { MetricType } from '$lib/model/metric-type';
	import type { Metric } from '$lib/model/metric';
	import { format } from 'date-fns';
	import { pb } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { metricTypes }: { metricTypes: MetricType[] } = $props();

	let metricTypeId = $derived(page.url.searchParams.get('metricTypeId') ?? metricTypes[0].id);
	let selectedMetricType = $derived(
		metricTypes.find((metricType) => metricType.id === metricTypeId)
	);

	async function handleSubmit(event: Event) {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);
		const metricTypeId = formData.get('metricTypeId')?.toString();
		const value = formData.get('value')?.toString();
		const datetime = formData.get('datetime')?.toString();
		const note = formData.get('note')?.toString();

		if (!value || !datetime || !metricTypeId) {
			return;
		}

		try {
			await pb.collection('metric').create<Metric>({
				metric_type: metricTypeId,
				value: parseFloat(value),
				note: note || undefined,
				datetime: new Date(datetime)
			});

			goto('/');
		} catch (error) {
			console.error('Failed to create metric:', error);
		}
	}

	function onSelectedMetricTypeChange(e: Event) {
		const selectedMetricTypeId = (e.target as HTMLSelectElement)?.value;
		goto(`?${new URLSearchParams({ metricTypeId: selectedMetricTypeId })}`);
	}
</script>

<form onsubmit={handleSubmit} class="row g-3">
	<div class="col-md-6">
		<label for="metricTypeId" class="form-label">Metric Type</label>
		<select
			name="metricTypeId"
			class="form-select"
			value={metricTypeId}
			onchange={onSelectedMetricTypeChange}
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
		<button type="submit" class="btn btn-primary"> Add Metric </button>
	</div>
</form>
