<script lang="ts">
	import { resolve } from '$app/paths';
	import Link from './link.svelte';
	let things: Array<'about' | 'contact' | 'blog' | 'projects'> = [
		'about',
		'blog',
		'contact',
		'projects'
	];
  let intros: Array<string> = ['intermittent things doer', "*not* a frontend dev...", 'committed to the "tech hipster" bit', 'lowercase enjoyer', "dont look at the site's source code it'll ruin your day"]
</script>

<section class="py-20">
	<h1 class="mb-6 text-5xl font-bold text-purple-300 md:text-6xl">
		hi, i'm <span class="text-purple-200">chuka</span>
	</h1>
	<div class="inline-flex">
		<p class="mb-8 text-xl text-purple-400 md:text-2xl">{intros.sort(() => Math.random() - 0.5)[0]}</p>
		<!-- <p class="mb-8 text-xl text-black hover:text-purple-400 md:text-2xl"> -->
		<!-- 	, typically in lowercase -->
		<!-- </p> -->
	</div>
	<div class="flex gap-4 col w-4 row">
		{#each things.sort(() => Math.random() - 0.5) as thing}
			<Link {thing} ></Link>
		{/each}
	</div>
</section>

<style>
  @media (max-width: 880px) {
	
	.row {
		display: grid;
	}

}
</style>
