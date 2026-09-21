<script lang="ts">
	import Blog from './blog.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	interface Blg {
		title: string;
		link: string;
		desc: string;
	}
	let blogs: Array<Blg> = [
		{
			title: 'finally got around to making a personal site',
			desc: 'dont know how someone with an ego my size took this long',
			link: 'site',
			created: 1772583770851,
		},

		{
			title: 'BearHacks 2026',
			desc: 'first hackathon loss of 2026...',
			link: 'bearhacks',
			created: 1778300412388,

		},

		{
			title: 'first time in San Francisco',
			desc: 'first of many hopefully',
			link: 'SF',
			created: 1780889081910,

		},
		{
			title: 'knowledge based tooling',
			desc: 'native approach to agentic efficiency',
			link: 'KBT',
			created: 1785214125799,

		},
    {
			title: 'ezeoke encryption',
			desc: 'where non-determinism meets encryption',
			link: 'EE',
			created: 1789932337143,

		}

	];
</script>

<section class="py-20">
	<h1 class="mb-8 text-4xl font-bold text-purple-300">blog</h1>

	<div class="space-y-8">
		{#each blogs.reverse()
		as blog}
			<Blog {blog}></Blog>
		{/each}
	</div>
</section>
