<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
	const { course } = data;
</script>

<svelte:head>
	<title>{$page.params['code'].toUpperCase()} - Timeplan</title>
</svelte:head>

<div class="bg-white border-2 border-black p-8 rounded-[36px]">
	<h1 class="text-4xl uppercase font-medium">{$page.params['code']}</h1>

	{#each course as event}
		<div class="flex flex-col gap-2">
			<h2 class="text-2xl font-medium">{event['teaching-title']}</h2>
		</div>
	{/each}
</div>
