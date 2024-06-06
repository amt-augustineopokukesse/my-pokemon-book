<script>
    import { onMount } from 'svelte';
    import { theme } from '$lib/stores';

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