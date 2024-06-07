<script>
	import { isVisible } from './stores';

	// @ts-ignore
    function changeThemeColor(newColor) {
        document.documentElement.style.setProperty('--theme', newColor);
    }

    function closeSelector() {
        isVisible.set(false);
    }
</script>

<div class="backdrop { $isVisible ? 'visible' : '' }" on:click={closeSelector}></div>
<div class="theme-selector { $isVisible ? 'visible' : '' }">
    <div class="title">Choose Theme</div>
    <div class="buttons">
        <button style="background-color: #E85382;" on:click={() => changeThemeColor('#E85382')}></button>
        <button style="background-color: #39BADF;" on:click={() => changeThemeColor('#39BADF')}></button>
        <button style="background-color: #E1A725;" on:click={() => changeThemeColor('#E1A725')}></button>
    </div>
</div>

<style>
    .backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}

    .backdrop.visible {
        display: block;
    }

	.theme-selector {
		box-sizing: border-box;
		display: flex;
        flex-direction: column;
		align-items: center;
		justify-content: center;
        gap: 5%;
		position: fixed;
		top: 30%;
		right: 35%;
		width: 30%;
		height: 30%;
		background-color: #EBEBEB;
		box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
		z-index: 1000;
        border-radius: 32px;
	}

    .title {
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        position: relative;
        width: 100%;
        height: 20%;
        background-color: white;
        border-top-left-radius: 32px;
        border-top-right-radius: 32px;

    }

    .theme-selector.visible {
        display: block;
    }
    .buttons {
        display: flex;
        width: 100%;
        height: 70%;
        align-items: center;
        justify-content: space-evenly;
        gap: 10px;
        
    }
	button {
		border: 2px solid transparent;
		border-radius: 50%;
		width: 18%;
		height: 50%;
		cursor: pointer;
        outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
	}
	button:focus {
		border-color: #000;
        box-shadow: 0 0 0 2px white;
	}
</style>
