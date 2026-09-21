<script lang="ts">
	import { page } from '$app/state';
	let demo = $derived(page.params.article || '');
</script>

