<script lang="ts">
	import axios from 'axios';
	import { onMount } from 'svelte';
  import { searchInput, theme, isVisible } from '$lib/stores';
	import pokeLogo from '../../assets/images/pokebook-logo.svg';
	import viewdetail from '../../assets/images/ic_baseline-remove-red-eye.svg';
  import PokemonDetail from '$lib/PokemonDetail.svelte';
  import ThemeSelector from '$lib/ThemeSelector.svelte';
  

	interface Pokemon {
		name: string;
		url: string;
		sprites: {
      other: {
        dream_world: {
          front_default: string;
        }
      }
		};
		types: {
			type: {
				name: string;
			};
		}[];
	}

	let pokemonList: Pokemon[] = [];
  let filteredPokemonList: Pokemon[] = [];
	let currentPage = 1;
	let itemsPerPage = 8;
	let totalPages = 500;
  let selectedPokemon: Pokemon | null = null;

  let search = '';
  let themeColor = 'pink';
  let isThemeTriggered = false;

  searchInput.subscribe(value => {
    search = value;
  });

  theme.subscribe(value => {
    themeColor = value;
  });

	async function fetchPokemon(): Promise<void> {
		try {
			const offset = (currentPage - 1) * itemsPerPage;
      const baseUrl = import.meta.env.VITE_POKEMON_API_BASE_URL;
			const response = await axios.get(
				`${baseUrl}/pokemon?offset=${offset}&limit=${itemsPerPage}`
			);
			const results = response.data.results;

			const promises = results.map(async (pokemon: { name: string; url: string }) => {
				const pokemonDetails = await axios.get(pokemon.url);
				return pokemonDetails.data;
			});

			pokemonList = await Promise.all(promises);
		} catch (error) {
			console.error('Error fetching Pokémon data:', error);
		}
	}


	onMount(async () => {
    try {
      await fetchPokemon();
      filterPokemonList();
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  });

  $: filteredPokemonList = search
    ? pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      )
    : pokemonList;

  const filterPokemonList = () => {
    if (search) {
      filteredPokemonList = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      filteredPokemonList = pokemonList;
    }
  };

	function handlePageChange(page: number) {
		currentPage = page;
		fetchPokemon();
	}

  function handleView(pokemon: Pokemon) {
    selectedPokemon = pokemon;
    document.querySelector('.overlay')?.classList.add('svelte-in');
  }

  function handleClose() {
    document.querySelector('.overlay')?.classList.remove('svelte-in');
    setTimeout(() => {
      selectedPokemon = null;
    }, 300);
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


	function themeModal() {
    isThemeTriggered = !isThemeTriggered;
    isVisible.set(isThemeTriggered);
	}
</script>

<div class="container">
	<nav class="header">
		<a href="/" class="logo-title">
			<img src={pokeLogo} alt="Pokébook" class="logo" />
			<p class="title"><span class="title-left">Poké</span><span class="title-right">book</p>
    </a>
    <div class="search-container">
      <input bind:value={search} type="text" placeholder="Enter pokemon name" />
    </div>
		<button class="themes-button" on:click={themeModal}></button>
	</nav>

	<main class="main">
    <section class="grid-container">
      <div class="pokemon-grid">
        {#each filteredPokemonList as pokemon}
          <div class="pokemon-card">
            <div class="pokemon-image-container">
              <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} class="pokemon-image"/>
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
        {/each}
      </div>
    </section>
  
    <section class="pagination-container">
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
        <select bind:value={itemsPerPage} on:change={() => handlePageChange(1)}>
          <option value="8">8</option>
          <option value="12">12</option>
          <option value="16">16</option>
          <option value="24">24</option>
        </select>
      </div>
  </section>

    {#if selectedPokemon}
      <PokemonDetail pokemon={selectedPokemon} onClose={handleClose}/>
    {/if}

    {#if $isVisible}
      <ThemeSelector />
    {/if}

  </main>

</div>

<style>

  .themes-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background-color: var(--theme);
  }

	.container {
		width: 100%;
		height: 100vh;
		padding-bottom: 20px;
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
	}

	.header {
		height: 10%;
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
    position: relative;
    text-decoration: none;
  }

	.logo {
		height: 120px; 
		position: absolute;
		top: 0px; 
	}

  .title {
      font-size: 24px;
      font-weight: 600;
      position: relative;
      left: 60%;
    }

    .title-left{
        color: black;
    }
    .title-right{
        color: var(--theme);
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

  .main {
    height: 90%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }

  .grid-container {
    width: 100%;
    height: 95%;
    box-sizing: border-box;
  }

	.pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(22%, 1fr));
    height: 100%;
    row-gap: 4rem;
    column-gap: 1rem;
    padding: 5% 10% 0% 10%;
    box-sizing: border-box;
    overflow-y: scroll;
  }

  .pokemon-card {
    padding: 2%;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 300px;
    position: relative;
    transition: height 0.5s, margin-bottom 0.5s;
  }

  .view-detail {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px, 20px, 12px, 20px;
    bottom: 10px;
    opacity: 0;
    background: var(--theme);
    border: none;
    border-radius: 14px;
    padding: 10px 20px;
    color: white;
    cursor: pointer;
    z-index: 1;
  }

  .pokemon-card:hover {
    height: 120%;
    margin-bottom: 200px;
  }

  .pokemon-card:hover .view-detail {
    opacity: 1;
    transition: opacity 0.5s;
  }

  .pokemon-image-container {
    width: 100%;
    height: 55%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f1f1f1;
    border-radius: 8px;
    position: relative;

  }

  .pokemon-image {
    width: 80%;
    height: 130%;
    position: absolute;
    top: -50px;
    margin-bottom: 0.5rem;
  }

  .pokemon-card h3 {
    text-transform: capitalize;
    margin: 0.5rem 0;
    font-size: 1.2rem;
  }

  .pokemon-types {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .pokemon-type {
    display: flex;
    align-items: center;
    padding: 0.3rem 0.6rem;
    font-size: 0.9rem;
    text-transform: capitalize;
    background: #EEEEEE;
    border-radius: 40px;
  }

  .pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;

  }
	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pagination button {
		padding: 0.5rem 1rem;
		border: none;
		background: #ccc;
		margin: 0 0.25rem;
		cursor: pointer;
	}

	.pagination button.active {
		background: var(--theme);
		color: white;
	}

	.pagination button.disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.items-per-page {
    width: 85px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #f3f3f3;
    text-align: left;
  }

  .items-per-page select {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
    background-color: transparent;
    padding: 0 10px;
    font-size: 16px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-align: center;
    cursor: pointer;
  }

  .items-per-page::after {
    content: '\25BC';
    position: absolute;
    right: 0px;
    pointer-events: none;
    font-size: 12px;
    color: #333;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .items-per-page select option {
    background-color: #fff;
    color: #333;
    font-size: 14px;
    padding: 8px;
  }
</style>