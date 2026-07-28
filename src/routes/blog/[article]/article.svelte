<script lang="ts">
	import { resolve } from '$app/paths';
	let content = $state('');
	import site from './site.txt?raw';
	import SF from './SF.txt?raw';
	import KBT from './KBT.txt?raw';
	import bearhacks from './bearhacks.txt?raw';
	const { article } = $props();
	// svelte-ignore state_referenced_locally
	switch (article.link) {
		case 'site':
			content = site;
			break;

		case 'SF':
			content = SF;
			break;

		case 'KBT':
			content = KBT;
			break;
		case 'bearhacks':
			content = bearhacks;
			break;
		default:
			content = '';
			break;
	}
	function showDate(time: number): string {
		const fullDate = new Date(time - 5 * 3600 * 1000);
		let dt = fullDate.toISOString().replaceAll('-', '/').replaceAll('Z', '').split('T');
		dt[1] = dt[1].split('.')[0];
		return dt.join(' @ ');
	}

	function showTime(time: number) {
		alert('In your time: ' + new Date(time).toLocaleString());
	}
</script>

<section class="py-20">
	<h1 class="mb-8 text-4xl font-bold text-purple-300">{article.title}</h1>

	<div class="space-y-6">
		<div class="inline-flex">
			<p class="border-l-2 pl-3 text-xs text-mauve-500">
				<button
					class="cursor-pointer"
					onclick={() => {
						showTime(article.created);
					}}
				>
					created {showDate(article.created)}</button
				>
			</p>
			<p class="tooltip ml-3 border-l-2 pl-3 text-xs text-mauve-500">
				<button
					class="cursor-pointer"
					onclick={() => {
						showTime(article.edited);
					}}
				>
					edited {showDate(article.edited)}</button
				>
			</p>
		</div>
		<div class="border-l-2 border-purple-800 pl-6">
			<p class="text-lg text-purple-600">{article.header}</p>
		</div>
		{#each content.split('\\n') as paragraph}
			<p class="text-white">{paragraph}</p>
		{/each}
	</div>
	<div class="mt-15 border-l-2 border-purple-900 pl-6">
		<a class="text-lg text-purple-800" href={resolve('/blog')}> ← back</a>
	</div>
</section>
