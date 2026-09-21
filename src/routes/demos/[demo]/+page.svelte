<script lang="ts">
	import { page } from '$app/state';
	import Ee from './ee.svelte'
  let demo = $derived(page.params.demo || '');
  let demoIs = (d: string) => {return d == demo}
</script>
{#if demoIs('EE')}
  <Ee />
<!-- {:else if  otherCondition} -->
{:else}
  <h1 class='text-white'>Not a Demo!</h1>
  
{/if}
