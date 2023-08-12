<script lang="ts">
	import { enhance } from '$app/forms';
	import { error } from '@sveltejs/kit';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Timeplan</title>
</svelte:head>

<div class="space-y-4 py-10">
	<form class="flex flex-col gap-4" method="post" use:enhance>
		{#if form?.error}
			<p class="text-center text-red-500">
				{form.error}
			</p>
		{/if}

		<input
			class="text-6xl text-center rounded-full border-2 border-black uppercase placeholder:capitalize py-3"
			type="text"
			name="code"
			placeholder="Emnekode..."
		/>

		<button
			class="bg-white border-black font-black border-2 rounded-full w-fit mx-auto py-3 px-8 hover:bg-gray-100"
			>Gå til emne</button
		>
	</form>
</div>
