<script lang="ts">
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
				<li class="nav-item">
					<a class="nav-link" href="/">Metrics</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/add">Add Metric</a>
				</li>
			</ul>
		</div>
	</div>
</nav>