<script lang="ts">
	import './layout.css';
	import { resolve } from '$app/paths';

  let blurbs: Array<string> = `artisinal, handwritten blogsite (no ai)
completely handwritten website. (excluding the libraries...)
I manually wrote this site—including that em dash
no matrices were multiplied in the making of this site
No AI. just me, a keyboard, and copious free time
I want the 2 people visiting this site to know: I didn't use AI to make this (0/2 care)
all hallucinations on this site are my own
chukaze.dev is 99.999% promptless!
this site was madee by 1 (me) person and zero (0) GPUs`.split('\n')
  const output = ``
	let { children } = $props();
</script>

<svelte:head>
	<title>chukaze</title> </svelte:head>

<header class="border-b border-purple-900 bg-black py-4">
	<nav class="mx-auto flex max-w-4xl items-center justify-between px-2 md:px-6">
		<a href={resolve('/')} class="text-white pl-2">home</a>
		<div class="flex gap-3 text-sm md:text-base md:gap-6">
			<a href={resolve('/about')} class="text-purple-300 hover:text-purple-200">about</a>
			<a href={resolve('/projects')} class="text-purple-300 hover:text-purple-200">projects</a>
			<a href={resolve('/contact')} class="text-purple-300 hover:text-purple-200">contact</a>
			<a href={resolve('/blog')} class="text-purple-300 hover:text-purple-200">blog</a>
			<a href={resolve('/demos')} class="text-purple-300 hover:text-purple-200">demos</a>
		</div>
	</nav>
</header>

<main class="mx-auto min-h-screen max-w-4xl px-6 py-12">
	{@render children()}
</main>

<footer class="mt-12 border-t border-purple-900 py-6">
	<div class="mx-auto max-w-4xl px-6 text-sm text-purple-500"> {blurbs.sort(() => Math.random() - 0.5)[0]}</div>
</footer>
