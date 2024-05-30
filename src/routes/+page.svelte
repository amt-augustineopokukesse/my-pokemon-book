<script>
    import pokeImg from '../assets/images/pokeCover.svg';
    let pokemonName = '';
    let pokeImage = pokeImg;
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
          <button class="search-button">
            🔍
          </button>
        </div>
        <a href="/all" class="view-all">View all</a>
    </div>
</div>
  
<style>
    .container {
        box-sizing: border-box;
      /* text-align: center; */
      /* padding: 2rem; */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100vh;
      padding-bottom: 20px;
      width: 100%;
      font-family: 'Roboto', sans-serif;
      /* background-color: aqua; */
    }

    .upper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 30%;
      height: 60%;
      /* background-color: yellow; */
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
        color: rgba(232, 83, 130, 1);
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
      /* background-color: aqua; */
      /* height: 40%; */
    }
  
    .search-bar {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
      width: 100%;
    }
  
    .search-input {
      padding: 0.5rem;
      border: 4px solid pink;
      border-radius: 25px 0 0 25px;
      width: 80%;
      height: 48px;
    }

    .search-input:focus {
      outline: none;
    }
  
    .search-button {
      background-color: pink;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0 25px 25px 0;
      cursor: pointer;
    }
  
    .view-all {
      display: inline-block;
      margin-top: 1rem;
      text-decoration: underline;
      /* color: blue; */
      cursor: pointer;
    }
</style>
  

  