<script lang="ts">
	import { resolve } from '$app/paths';
	export let thing: 'about' | 'blog' | 'contact' | 'projects' | 'demos';
</script>

<a
	href={resolve(`/${thing}`)}
	class="border border-purple-700 px-6 py-3 text-purple-300 transition-colors hover:border-purple-500"
>
	[{thing}]
</a>
