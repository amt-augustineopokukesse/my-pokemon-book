<script>
  import pokeImg from '../assets/images/pokeCover.svg';
  import { searchInput } from '$lib/stores';
  import { goto } from '$app/navigation';
  import SearchIcon from '$lib/SearchIcon.svelte'

  let pokemonName = '';
  let pokeImage = pokeImg;

  const handleSearch = () => {
    searchInput.set(pokemonName);
    goto('/all');
  }
</script>

<div class="container">
    <div class="upper">
        <img src={pokeImage} alt="Pokémon" class="header-image" />
        <div class="title-description">
            <div class="title"><span class="title-left">Poké</span><span class="title-right">book</span></div>
            <div class="description">Largest Pokémon index with information about every Pokemon you can think of.</div>
        </div>

    </div>
    <div class="lower">
        <div class="search-bar">
          <input 
            type="text" 
            placeholder="Enter pokeman name" 
            bind:value={pokemonName} 
            class="search-input"
          />
          <button on:click={handleSearch} class="search-icon">
            <!-- <img src="/src/assets/images/pokemon-search.svg" alt="search-icon" >             -->
            <SearchIcon />
          </button>
        </div>
        <a href="/all" class="view-all">View all</a>
    </div>
</div>
  
<style>
    .container {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100vh;
      padding-bottom: 20px;
      width: 100%;
      font-family: 'Roboto', sans-serif;
    }

    .upper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 30%;
      height: 60%;
    }

    .title-description {
      text-align: center;
      
    }
  
    .header-image {
      width: 100%;
      max-width: 300px;
    }
  
    .title {
      font-size: 2.5rem;
      margin: 1rem 0;
      font-weight: 600;
    }

    .title-left{
        color: black;
    }
    .title-right{
        color: var(--theme);
    }
  
    .description {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }

    .lower {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 40%;
    }
  
    .search-bar {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
      width: 100%;
      position: relative;
      border: 4px solid var(--theme);
      border-radius: 50px;

    }
  
    .search-input {
      padding: 0.5rem;
      padding-left: 20px;
      border-radius: 50px;
      width: 100%;
      height: 48px;
      font-size: 24px;
      border: none;
    }

    .search-input:focus {
      outline: none;
    }
  
    .search-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: none;
      /* padding: 0.5rem 1rem; */
      border-radius: 0 25px 25px 0;
      cursor: pointer;
      position: absolute;
      right: 0%;
      top: 10%;
    }
  
    .view-all {
      display: inline-block;
      margin-top: 1rem;
      text-decoration: underline;
      cursor: pointer;
      color: black;
    }
</style>
  

  