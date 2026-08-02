<script>
	import Contact from './contact.svelte';
	import { resolve } from '$app/paths';
	const contacts = [
		{
			name: 'github',
			link: 'https://github.com/BeanyZoldyck',
			svg: `<svg
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							shape-rendering="geometricPrecision"
							viewBox="0 0 24 24"
							height="60"
							width="60"
							style="color: currentcolor;"
							><path
								d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
							></path></svg
						>`
		},
		{
			name: 'linkedin',
			link: 'https://linkedin.com/in/chukaez',
			svg: `<svg
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						shape-rendering="geometricPrecision"
						viewBox="0 0 24 24"
						height="60"
						width="60"
						style="color: currentcolor;"
						><path
							d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
						></path><circle cx="4" cy="4" r="2"></circle></svg
					>`
		},
		{
			name: 'twitter',
			link: 'https://x.com/chuka_ze',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
</svg>`
		},
		{
			name: 'devpost',
			link: 'https://devpost.com/cezeoke',
			svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg stroke="currentColor" fill="#000000" width="70px" height="70px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M6.002 1.61 0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>`
		}
	];
</script>

<section class="py-20">
	<h1 class="mb-8 text-4xl font-bold text-purple-300">contact</h1>

	<div class="space-y-8">
		<div class="border-l-2 border-purple-700 pl-6">
			<p class="mb-2 text-lg text-purple-400">feel free to reach out:</p>
			<Contact
				contact={{
					link: {resolve('/email')},//wait I'm hilarious
					name: 'email',
					svg: `<svg
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					shape-rendering="geometricPrecision"
					viewBox="0 0 24 24"
					height="40"
					width="40"
					style="color: currentcolor;"
					><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
					></path><path d="M22 6l-10 7L2 6"></path></svg
				>`
				}}
			></Contact>
		</div>

		<div class="border-l-2 border-purple-700 pl-6">
			<p class="mb-4 text-lg text-purple-400">find me online:</p>
			<div class="grid w-100 grid-cols-2 space-y-4">
				{#each contacts.sort(() => Math.random() - 0.5) as contact}
					<!-- content here -->
					<Contact {contact}></Contact>
				{/each}
			</div>
		</div>
	</div>
</section>
