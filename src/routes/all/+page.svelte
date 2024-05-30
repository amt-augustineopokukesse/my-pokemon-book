<script lang="ts">
	import axios from 'axios';
	import { onMount } from 'svelte';
	import pokeLogo from '../../assets/images/pokebook-logo.svg';

	interface Pokemon {
		name: string;
		url: string;
		sprites: {
			front_default: string;
		};
		types: {
			type: {
				name: string;
			};
		}[];
	}

	let pokemonList: Pokemon[] = [];
	let currentPage = 1;
	let itemsPerPage = 8;
	let totalPages = 1281;

	async function fetchPokemon() {
		try {
			const offset = (currentPage - 1) * itemsPerPage;
			const response = await axios.get(
				`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${itemsPerPage}`
			);
			const results = response.data.results;

			const promises = results.map(async (pokemon: { name: string; url: string }) => {
				const pokemonDetails = await axios.get(pokemon.url);
				console.log(pokemonDetails);
				return pokemonDetails.data;
			});

			pokemonList = await Promise.all(promises);
		} catch (error) {
			console.error('Error fetching Pokémon data:', error);
		}
	}

	onMount(fetchPokemon);

	function handlePageChange(page: number) {
		currentPage = page;
		fetchPokemon();
	}

	function getVisiblePages() {
		const visiblePages = 5;
		let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
		let endPage = startPage + visiblePages - 1;

		if (endPage > totalPages) {
			endPage = totalPages;
			startPage = Math.max(1, endPage - visiblePages + 1);
		}

		return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	}
</script>

<div class="container">
	<div class="header">
		<div class="logo-title">
			<img src={pokeLogo} alt="Pokébook" class="logo" />
			<p class="title"><span class="title-left">Poké</span><span class="title-right">book</p>
		</div>
    <div class="search-container">
      <input type="text" placeholder="Enter pokemon name" />
    </div>
		<p>color picker</p>
	</div>

	<div class="pokemon-grid">
		{#each pokemonList as pokemon}
			<div class="pokemon-card">
				<img src={pokemon.sprites.front_default} alt={pokemon.name} />
				<h3>{pokemon.name}</h3>
				<div>
					{#each pokemon.types as type}
						<span>{type.type.name}</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<div class="pagination">
		<button class:disabled={currentPage === 1} on:click={() => handlePageChange(currentPage - 1)}>
			&lt;
		</button>

		{#each getVisiblePages() as page}
			<button class:active={currentPage === page} on:click={() => handlePageChange(page)}>
				{page}
			</button>
		{/each}

		<button
			class:disabled={currentPage === totalPages}
			on:click={() => handlePageChange(currentPage + 1)}
		>
			&gt;
		</button>
	</div>

	<div class="items-per-page">
		Items per page:
		<select bind:value={itemsPerPage} on:change={() => handlePageChange(1)}>
			<option value="8">8</option>
			<option value="12">12</option>
			<option value="16">16</option>
			<option value="24">24</option>
		</select>
	</div>
</div>

<style>
	.container {
		width: 100%;
		/* background-color: aquamarine; */
		height: 100vh;
		padding-bottom: 20px;
    font-family: 'Roboto', sans-serif;
	}

	.header {
		height: 80px;
		padding: 0 5%;
		display: flex;
		position: relative;
		justify-content: space-between;
		align-items: center;
		box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
		background-color: #f8f8f8;
    box-sizing: border-box;
	}

  .logo-title {
    display: flex;
    align-items: center;
    width: 25%;
    /* background-color: bisque; */
    position: relative;
    /* gap: 10px; */
  }

	.logo {
		height: 120px; /* Adjust as needed for vertical overflow */
		position: absolute;
		/* left: 10px; */
		top: 0px; /* Adjust for vertical overflow */
	}

  .title {
      font-size: 24px;
      /* margin-left: 150px; */
      font-weight: 600;
      position: relative;
      left: 60%;
    }

    .title-left{
        color: black;
    }
    .title-right{
        color: rgba(232, 83, 130, 1);
    }

    .search-container {
    display: flex;
    align-items: center;
    width: 40%;
    justify-content: center;
    position: relative;
  }

  .search-container input {
    width: 100%;
    padding: 12px 20px;
    border: 1px solid #ccc;
    border-radius: 25px;
    font-size: 16px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    outline: none;
    transition: box-shadow 0.2s;
  }

  .search-container input::placeholder {
    color: #999;
    font-style: italic;
  }

  .search-container input:focus {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

	.pokemon-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
		margin-top: 2rem;
	}

	.pokemon-card {
		padding: 1rem;
		background: #fff;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.pokemon-card img {
		width: 100px;
		height: 100px;
	}

	.pokemon-card h3 {
		text-transform: capitalize;
		margin: 0.5rem 0;
	}

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 2rem;
	}

	.pagination button {
		padding: 0.5rem 1rem;
		border: none;
		background: #ccc;
		margin: 0 0.25rem;
		cursor: pointer;
	}

	.pagination button.active {
		background: #ff6384;
		color: white;
	}

	.pagination button.disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.items-per-page {
		margin-top: 1rem;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.items-per-page select {
		margin-left: 0.5rem;
	}
</style>
