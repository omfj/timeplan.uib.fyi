<script lang="ts">
	import { enhance } from '$app/forms';
	import { getWeek } from '$lib/date';
	import { courses } from '$lib/courses';
	import type { ActionData } from './$types';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let form: ActionData;

	let searchInput: HTMLInputElement;

	let search = '';

	let isOpen = false;

	onMount(() => {
		const clickHandler = (event: MouseEvent) => {
			if (
				!searchInput.contains(event.target as Node) &&
				!searchInput.parentElement?.contains(event.target as Node)
			) {
				isOpen = false;
			}
		};

		document.addEventListener('click', clickHandler);

		return () => {
			document.removeEventListener('click', clickHandler);
		};
	});

	$: {
		if (browser) {
			isOpen = search.length > 0;
		}
	}

	$: searchResults = courses
		.filter(
			(course) =>
				course.id.toLowerCase().includes(search.toLowerCase()) ||
				course.name.toLowerCase().includes(search.toLowerCase())
		)
		.slice(0, 5);
</script>

<svelte:head>
	<title>Timeplan</title>
</svelte:head>

<div class="space-y-4 py-10">
	<p class="text-center text-2xl font-bold">
		Uke: {getWeek()}
	</p>

	<form class="flex flex-col gap-4" method="post" use:enhance>
		{#if form?.error}
			<p class="text-center text-red-500">
				{form.error}
			</p>
		{/if}

		<div class="relative max-w-xl mx-auto space-y-2">
			<input
				bind:this={searchInput}
				class="relative mx-auto w-full text-[min(10vw,60px)] text-center rounded-full border-2 border-black uppercase placeholder:capitalize py-2"
				type="text"
				name="code"
				placeholder="Emnekode..."
				bind:value={search}
			/>

			{#if isOpen}
				<div
					class="w-full z-10 bg-white border-2 border-black rounded-[36px] overflow-hidden"
				>
					{#if searchResults.length === 0}
						<p class="text-center py-4 px-8 text-lg font-medium">Fant ingen emner</p>
					{:else}
						<ul>
							{#each searchResults as result}
								<li>
									<a
										class="block py-4 px-8 hover:bg-gray-100 font-medium text-lg hover:underline"
										href={`/emne/${result.id}`}
									>
										{result.id} - {result.name}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/if}
		</div>

		<button
			class="bg-white border-black font-black border-2 rounded-full w-fit mx-auto py-3 px-8 hover:bg-gray-100"
			>Gå til emne</button
		>
	</form>
</div>
