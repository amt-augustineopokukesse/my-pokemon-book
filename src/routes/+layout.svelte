<script>
    import { onMount } from 'svelte';

    onMount(() => {
        document.documentElement.style.setProperty('--theme', '#E85382');
    });
</script>

<style>
    :root {
        --theme: #E85382;
    }
</style>

<slot />