<script lang="ts">
	import { enhance } from '$app/forms';
	import { getWeek } from '$lib/date';
	import { courses } from '$lib/courses';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let search = '';
	let isOpen = true;

	$: searchResults = courses
		.filter((course) => course.id.toLowerCase().includes(search.toLowerCase()) || course.name.toLowerCase().includes(search.toLowerCase()))
		.slice(0, 5);
</script>

<svelte:head>
	<title>Timeplan</title>
</svelte:head>

<div class="space-y-4 py-10">
	<p class="text-center text-lg font-bold">
		Uke: {getWeek()}
	</p>

	<form class="flex flex-col gap-4" method="post" use:enhance>
		{#if form?.error}
			<p class="text-center text-red-500">
				{form.error}
			</p>
		{/if}

		<div class="relative mx-auto space-y-2">
			<input
				class="relative text-[min(10vw,60px)] text-center rounded-full border-2 border-black uppercase placeholder:capitalize py-3"
				type="text"
				name="code"
				placeholder="Emnekode..."
				bind:value={search}
			/>

			{#if isOpen}
				<div class="aboslute z-10 bg-white border-2 border-black">
					<ul>
						{#each searchResults as result}
							<li class="py-2 px-4 hover:bg-gray-100">
								<a href={`/emne/${result.id}`}>
									{result.id} - {result.name}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>

		<button
			class="bg-white border-black font-black border-2 rounded-full w-fit mx-auto py-3 px-8 hover:bg-gray-100"
			>Gå til emne</button
		>
	</form>
</div>
