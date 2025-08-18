<script lang="ts">
	import type { MetricType } from '$lib/model/metric-type';
	import { getColorHex } from '$lib/utils/get-color-hex';

	let { metricTypes }: { metricTypes: MetricType[] } = $props();
	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
	<div class="container">
		<a class="navbar-brand" href="/">Health Tracker</a>
		<button
			class="navbar-toggler"
			type="button"
			onclick={toggleMenu}
			aria-controls="navbarNav"
			aria-expanded={isMenuOpen}
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" class:show={isMenuOpen} id="navbarNav">
			<ul class="navbar-nav">
				{#each metricTypes as metricType}
					<li class="nav-item">
						<a class="nav-link d-flex align-items-center" href="/metric-type/{metricType.id}">
							<div
								class="me-2 rounded-circle"
								style="width: 16px; height: 16px; background-color: {getColorHex(metricType.color)}"
							></div>
							{metricType.name}
						</a>
					</li>
				{/each}
				<li class="nav-item">
					<a class="nav-link" href="/add">Add Metric</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
