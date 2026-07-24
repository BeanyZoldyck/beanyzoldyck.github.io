<script lang="ts">
	import Project from './project.svelte';
	interface Pjct {
		title: string;
		link: string;
		info: string;
		desc: string;
	}
	let projects: Array<Pjct> = [
		{
			title: 'Stockbear',
			desc: 'Neural network written from scratch in C++ aiming to distill stockfish',
			link: 'https://github.com/BeanyZoldyck/stockbear/tree/main?tab=readme-ov-file',
			info: 'this project got a B'
		},
		{
			title: 'Obfuscryption',
			desc: "collection of cryptography scripts i've written",
			link: 'https://github.com/BeanyZoldyck/obfuscryption',
			info: ''
		},
		{
			title: 'BabbleFish',
			desc: 'hackathon project that summarizes, translates, and semantically searches text channels',
			link: 'https://devpost.com/software/babelfetch',
			info: "it lost the Gemini track to a project that didn't use Gemini"
		},
		{
			title: 'NameBot',
			desc: 'machine Learning library made with no libraries in python. example predicts gender of input name',
			link: 'https://github.com/BeanyZoldyck/NameBot',
			info: ''
		},
		{
			title: 'GenDaBot',
			desc: 'model trained on ~100,000 tweets to predict the gender of the author',
			link: 'https://github.com/BeanyZoldyck/GenDaBot/',
			info: ''
		},
		{
			title: 'LLM.c',
			desc: 'transformer architecture in C ',
			link: 'https://github.com/BeanyZoldyck/llm.c',
			info: 'WIP, currently implementing backpropagation'
		}
	];
</script>

<section class="py-20">
	<h1 class="mb-8 text-4xl font-bold text-purple-300">projects</h1>

	<div class="space-y-8">
		{#each projects.sort(() => Math.random() - 0.5) as project}
			<Project {project}></Project>
		{/each}
	</div>
</section>
