<script lang="ts">
	import { enhance } from '$app/forms';
	import { getWeek } from 'date-fns';
	import { outsideClick } from '$lib/actions/outside-click';
	import { fade } from 'svelte/transition';
	import { debounce } from '$lib/utils';
	import { fetchCourses } from '$lib/api/courses.js';
	import { onDestroy } from 'svelte';

	let { form } = $props();

	let searchResults = $state<Awaited<ReturnType<typeof fetchCourses>>>([]);
	let isOpen = $state(false);
	let searchTerm = $state('');
	let controller = $state<AbortController | null>(null);

	const searchCourses = debounce(async (search: string) => {
		if (search.length < 2) {
			searchResults = [];
			return;
		}
		const data = await fetchCourses(search, {
			signal: controller?.signal
		});

		searchResults = data;
	}, 300);

	onDestroy(() => {
		controller?.abort();
	});
</script>

<svelte:head>
	<title>Timeplan | uib.fyi</title>
</svelte:head>

<div class="space-y-4 py-10">
	<p class="text-center text-4xl font-bold">
		Uke: {getWeek(new Date())}
	</p>

	<form class="flex flex-col gap-4" method="post" use:enhance>
		{#if form?.error}
			<p class="text-center text-red-500">
				{form.error}
			</p>
		{/if}

		<div class="relative max-w-xl mx-auto space-y-2">
			<input
				class="relative mx-auto w-full text-[min(10vw,60px)] text-center rounded-full border-2 border-black uppercase placeholder:capitalize py-2"
				type="text"
				name="code"
				placeholder="Emnekode..."
				onfocus={() => (isOpen = true)}
				bind:value={searchTerm}
				oninput={(e) => {
					isOpen = true;

					if (controller) {
						controller.abort('Aborting previous search');
					}

					controller = new AbortController();
					searchCourses(e.currentTarget.value);
				}}
				onkeydown={(e) => {
					if (e.key === 'Escape') {
						isOpen = false;
					}
				}}
				use:outsideClick={() => (isOpen = false)}
			/>

			{#if isOpen}
				<div
					class="w-full z-10 bg-white border-2 border-black absolute rounded-[36px] overflow-hidden"
					in:fade={{ duration: 100 }}
					out:fade={{ duration: 100 }}
					role="listbox"
					tabindex="0"
					onkeydown={(e) => {
						if (e.key === 'Escape') {
							isOpen = false;
						}
					}}
				>
					{#if searchResults.length === 0}
						{#if searchTerm.length > 1}
							<p class="text-center py-4 px-8 text-lg font-medium">Fant ingen emner</p>
						{:else}
							<p class="text-center py-4 px-8 text-lg font-medium">Søk på emnekode eller navn</p>
						{/if}
					{:else}
						<ul>
							{#each searchResults as result}
								<li>
									<a
										class="block py-4 px-8 focus:bg-gray-100 focus:underline hover:bg-gray-100 font-medium text-lg hover:underline"
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
