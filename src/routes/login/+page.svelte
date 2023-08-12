<script lang="ts">
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, errors, constraints, enhance } = superForm(data.form, {
		resetForm: true,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				goto('/');
			}
		}
	});
</script>

<div class="bg-white border-2 border-black p-8 rounded-[36px]">
	<h1 class="text-3xl font-black mb-5">Login</h1>

	<form class="space-y-4" method="post" use:enhance>
		<div class="flex flex-col gap-2">
			<label class="font-extrabold" for="username">Username</label>
			<input
				type="text"
				name="username"
				id="username"
				class="p-2 bg-gray-100 rounded border-2 border-black"
				bind:value={$form.username}
				{...$constraints.username}
			/>
			{#if $errors.username}
				<p class="text-red-500">{$errors.username}</p>
			{/if}
		</div>

		<div class="flex flex-col gap-2">
			<label class="font-extrabold" for="password">Password</label>
			<input
				type="password"
				name="password"
				id="password"
				class="p-2 bg-gray-100 rounded border-2 border-black"
				bind:value={$form.password}
				{...$constraints.password}
			/>
			{#if $errors.password}
				<p class="text-red-500">{$errors.password}</p>
			{/if}
		</div>

		<div class="flex flex-col md:flex-row gap-2 justify-between">
			<button
				class="bg-white border-black font-black border-2 rounded-full w-fit py-3 px-8 hover:bg-gray-100"
				>Logg inn</button
			>

			<button
				class="bg-white border-black font-black border-2 rounded-full w-fit py-3 px-8 hover:bg-gray-100"
				>Lag bruker</button
			>
		</div>
	</form>
</div>
