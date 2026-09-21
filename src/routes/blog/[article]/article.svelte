<script lang="ts">
	import { resolve, asset } from '$app/paths';
	let content = $state('');
	import site from './site.txt?raw';
	import SF from './SF.txt?raw';
	import KBT from './KBT.txt?raw';
	import EE from './EE.txt?raw';
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
		case 'EE':
			content = EE;
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
  function lineStartsWith(str: string, head: string){
return str.startsWith(head,1) || str.startsWith(head,0)
  }
</script>

<svelte:head>
  <!-- Basic Open Graph Tags for Discord & Twitter -->
  <meta property="og:title" content={article.title} />
  <meta property="og:description" content={article.header} />
  <meta property="og:image" content={article.thumbnail} />
  <meta property="og:url" content="https://chukaze.dev" />
  <meta property="og:type" content="website" />

  <!-- Twitter Card Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="chukaze.dev" />
  <meta name="twitter:description" content="Personal site" />
  <meta name="twitter:image" content="https://chukaze.dev" />
</svelte:head>
<section class="py-20">
	<h1 class="mb-8 text-4xl font-bold text-purple-300">{article.title}</h1>

	<div class="space-y-6">
		<div class="inline-flex">
			<p class="border-l-2 pl-1 text-xs text-mauve-500">
			</p>
			<p class="tooltip ml-1 pl-3 text-xs text-mauve-500">
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
      {#if (lineStartsWith(paragraph, "\\img"))}
        <a href={paragraph.split(';')[3]} target="_blank">
        <img src={asset(`/pics/${paragraph.split(';')[1]}`)} alt={paragraph.split(';')[2]} />
        </a>
        <br>
		{:else if paragraph.includes('\\a')}
<p class="text-white">
      {#each paragraph.split('\\a') as block, ind}
         {ind == 0 ? paragraph.split(";")[0].substring(0, paragraph.split(";")[0].length -3) : ''} <a class="text-purple-500" href={block.split(';')[2]+console.log(ind == 1 ? paragraph.split(";")[0].substring(0, paragraph.split(";")[0].length - 3) : '')} target="_blank">{block.split(';')[1]}</a>
        {block.split(';')[3]}
      {/each}</p>
      {:else if (lineStartsWith(paragraph, "\\br"))}
      <hr class="border-t border-purple-800 my-12">
    {:else}
			<p class="text-white break-words">{paragraph}</p>
      {/if}
		{/each}
	</div>
	<div class="mt-15 border-l-2 border-purple-900 pl-6">
		<a class="text-lg text-purple-800" href={resolve('/blog')}> ← back</a>
	</div>
</section>
