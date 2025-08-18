<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/header.svelte';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header metricTypes={data.metricTypes} />

<div class="container mt-4">
	{@render children?.()}
</div>
