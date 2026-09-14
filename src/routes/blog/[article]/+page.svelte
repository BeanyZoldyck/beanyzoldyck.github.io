<script lang="ts">
	import { page } from '$app/state';
	import Article from './article.svelte';
	let link = $derived(page.params.article || '');
	interface ArticleData {
		link: string;
		title: string;
		header: string;
		edited: number;
    thumbnail: string;
	}
	const articles: Array<ArticleData> = [
		{
			link: 'site',
			title: 'personal site',
			header: 'took me long enough',
			edited: 1772718227084
		},
		{
			link: 'bearhacks',
			title: 'chuka - caffeine = fraud?',
			header: 'hype moments and aura was not enough to bring back a win',
			edited: 1784272609000,
      },
		{
			link: 'SF',
			title: 'fist time in SF',
			header: 'got citymogged so hard I wrote this on the flight back',
			edited: 1780889081910
		},

		{
			link: 'KBT',
			title: 'knowledge based tooling',
			header: 'we DONE with RAG',
			edited: 1789420745010,
      thumbnail: "https://i0.wp.com/the-digital-librarian.com/wp-content/uploads/2023/01/Untitled-design-3.png?fit=1200%2C628&ssl=1"
    },
	];
	function getArticle(ref: string): ArticleData {
		for (const article of articles) {
			if (article.link == ref) return article;
		}
		return {
			link: 'none',
			title: 'Article not found!',
			header: 'just go back to blogs using the button below',
			created: 0,
			edited: Date.now()
		};
	}
</script>

<Article article={getArticle(link)}></Article>
