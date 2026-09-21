<script lang="ts">
	import Demo from './demo.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	interface Dmo {
		title: string;
		link: string;
		desc: string;
	}
	let demos: Array<Dmo> = [
    {
      name: "ezeoke encryption",
      desc: "non-deterministic encryption algorithm",
      link: "EE",
    }

	];
</script>

<section class="py-20">
	<h1 class="mb-8 text-4xl font-bold text-purple-300">demos</h1>

	<div class="space-y-8">
		{#each demos.reverse()
		as demo}
			<Demo {demo}></Demo>
		{/each}
	</div>
</section>
