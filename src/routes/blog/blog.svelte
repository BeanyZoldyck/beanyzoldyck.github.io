<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	function showDate(time: number): string {
		const fullDate = new Date(time - 5 * 3600 * 1000);
		let dt = fullDate.toISOString().replaceAll('-', '/').replaceAll('Z', '').split('T');
		dt[1] = dt[1].split('.')[0];
		return dt.join(' @ ');
	}
	interface BlogProp {
    blog: { title: string; link: string; desc: string; created: number };
	}
	let { blog }: BlogProp = $props();
</script>

<a
	href={resolve(`/blog/${blog.link}/`)}
	class="block border border-purple-900 p-6 transition-colors hover:border-purple-700"
>
	<h2 class="mb-2 text-2xl font-bold text-purple-200">{blog.title}</h2>
	<p class="mb-2 text-purple-400">
		{blog.desc}
	</p>
	<span class="text-purple-700 hover:border-purple-500">

					created {showDate(blog.created)}
  </span>
</a>
