<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/header.svelte';
	import 'bootstrap/dist/css/bootstrap.min.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />

<div class="container mt-4">
	{@render children?.()}
</div>
