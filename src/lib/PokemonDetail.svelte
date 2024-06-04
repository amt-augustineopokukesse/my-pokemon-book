<script>
	// @ts-nocheck

	export let pokemon;
	export let onClose;

	let showAbout = false;
	let showStats = true;
	let showSimilar = false;

	// @ts-ignore
	const toggleShow = (type) => {
		if (type === 'about') {
			showAbout = true;
			showStats = false;
			showSimilar = false;
		} else if (type === 'stats') {
			showAbout = false;
			showStats = true;
			showSimilar = false;
		} else if (type === 'similar') {
			showAbout = false;
			showStats = false;
			showSimilar = true;
		}
	};

	// @ts-ignore
	$: console.log(pokemon);
</script>

<div class="overlay">
	<div class="image-container">
		<button class="close-button" on:click={onClose}>←</button>
		<img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
	</div>
	<div class="info-details">
		<div class="pokemon-info">
			<h1>{pokemon.name}</h1>
			<div class="pokemon-types">
				{#each pokemon.types as type}
					<span class="pokemon-type">
						{type.type.name}
					</span>
				{/each}
			</div>
		</div>
		{#if showAbout}
			<div class="pokemon-details">
				<h3>About</h3>
				<p>Height: <strong>{pokemon.height}m</strong></p>
				<p>Weight: <strong>{pokemon.weight}kg</strong></p>
				<p>Abilities: <strong>{pokemon.abilities.map((a) => a.ability.name).join(', ')}</strong></p>
			</div>
		{/if}
		{#if showStats}
			<div class="stats-section">
				<h2>Stats</h2>
				{#each pokemon.stats as stat}
					<div class="stat">
						<span class="stat-name">{stat.stat.name}</span>
						<div class="stat-bar">
							<div class="stat-value" style="width: {stat.base_stat}%;"></div>
						</div>
						<span class="stat-number">{stat.base_stat}</span>
					</div>
				{/each}
			</div>
		{/if}
		{#if showSimilar}
        <!-- {#each pokemon.s as }
            
        {/each} -->
			<div class="pokemon-card">
				<div class="pokemon-image-container">
					<img
						src={pokemon.sprites.other.dream_world.front_default}
						alt={pokemon.name}
						class="pokemon-image"
					/>
				</div>
				<h3>{pokemon.name}</h3>
				<div class="pokemon-types">
					{#each pokemon.types as type}
						<span class="pokemon-type">
							{type.type.name}
						</span>
					{/each}
				</div>
				<button class="view-detail" on:click={() => handleView(pokemon)}>
					<span>View Pokemon</span>
					<img src={viewdetail} alt="View Details" />
				</button>
			</div>
		{/if}
	</div>
	<div class="buttons">
		<button on:click={() => toggleShow('about')}>About</button>
		<button on:click={() => toggleShow('stats')}>Stats</button>
		<button on:click={() => toggleShow('similar')}>Similar</button>
	</div>
</div>

<style>
	.overlay {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: 0;
		right: 0;
		width: 40%;
		height: 100%;
		background: white;
		box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
		padding: 20px;
		z-index: 2;
	}

	.image-container {
		position: relative;
		width: 100%;
		height: 35%;
		background-image: linear-gradient(#7fcad1, #3da0a9);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		width: 50%;
		/* height: 80%; */
		/* background-color: yellow; */
		position: absolute;
		top: 10%;
	}

	.close-button {
		background: white;
		border: none;
		font-size: 24px;
		cursor: pointer;
		position: absolute;
		top: 10px;
		left: 10px;
		width: 20%;
		height: 20%;
		border-radius: 9px;
	}

	.info-details {
		/* margin-top: -10%; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		margin-bottom: 20px;
		/* background-color: #3da0a9; */
	}

	.pokemon-info {
		/* text-align: center; */
		padding-top: 0%;
		/* margin-top: 10%; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		margin-bottom: 20px;
		/* background-color: #3da0a9; */
	}
	.pokemon-info h1 {
		padding: 5px;
		margin: 0%;
		text-transform: capitalize;
		font-weight: 600;
		font-size: 36px;
	}

	.pokemon-types {
		display: flex;
		justify-content: center;
		gap: 10px;
		/* margin-top: 0.5rem; */
	}

	.pokemon-type {
		display: flex;
		align-items: center;
		/* background-color: #f8f8f8; */
		padding: 0.3rem 0.6rem;
		font-size: 0.9rem;
		text-transform: capitalize;
		background: #eeeeee;
		border-radius: 40px;
	}

	.pokemon-details {
		display: flex;
		gap: 10px;
		height: 100px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* background-color: #3da0a9; */
		margin-top: 10%;
	}

	.pokemon-details h3 {
		margin: 20px;
		padding: 12px 0;
		width: 150%;
		text-align: center;
		border-top: 1px solid rgb(204, 204, 204, 0.2);
		border-bottom: 1px solid rgb(204, 204, 204, 0.2);
	}
	.pokemon-details p {
		margin: 0;
	}

	.stats-section {
		width: 200%;
	}

	.stats-section h2 {
		margin-bottom: 10px;
		font-size: 18px;
		text-align: center;
	}

	.stat {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	.stat-name {
		font-size: 14px;
		text-align: right;
	}

	.stat-bar {
		flex: 3;
		height: 10px;
		background: #eee;
		border-radius: 5px;
		margin: 0 10px;
		overflow: hidden;
	}

	.stat-value {
		height: 100%;
		background: #76c7c0;
	}

	.stat-number {
		flex: 1;
		text-align: right;
		font-size: 14px;
	}

	.buttons {
		display: flex;
		width: 60%;
		height: 50px;
		align-items: center;
		justify-content: space-evenly;
		gap: 10px;
		background-color: #e9e9e9;
		border-radius: 60px;
	}

	.buttons button {
		background-color: #e9e9e9;
		border-radius: 60px;
		border: none;
		padding: 10px 20px;
		font-weight: 600;
	}

	.buttons button:hover {
		cursor: pointer;
		background-color: rgba(174, 221, 244, 0.5);
	}

	.buttons button:focus {
		background-color: white;
	}

	.overlay.svelte-in {
		transform: translateX(0);
	}
</style>
