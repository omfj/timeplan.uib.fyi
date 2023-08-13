<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

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
	<h1 class="text-3xl font-black mb-5">Register deg</h1>

	<form class="space-y-4" method="post" use:enhance>
		<div class="flex flex-col gap-2">
			<label class="font-extrabold" for="username">Brukernavn</label>
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
			<label class="font-extrabold" for="email">E-post</label>
			<input
				type="email"
				name="email"
				id="email"
				class="p-2 bg-gray-100 rounded border-2 border-black"
				bind:value={$form.email}
				{...$constraints.email}
			/>
			{#if $errors.email}
				<p class="text-red-500">{$errors.email}</p>
			{/if}
		</div>

		<div class="flex flex-col gap-2">
			<label class="font-extrabold" for="password">Passord</label>
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

		<div class="flex flex-col gap-2">
			<label class="font-extrabold" for="passwordConfirm">Bekreft passord</label>
			<input
				type="password"
				name="passwordConfirm"
				id="passwordConfirm"
				class="p-2 bg-gray-100 rounded border-2 border-black"
				bind:value={$form.passwordConfirm}
				{...$constraints.passwordConfirm}
			/>
			{#if $errors.passwordConfirm}
				<p class="text-red-500">{$errors.passwordConfirm}</p>
			{/if}
		</div>

		<div class="flex flex-col md:flex-row gap-2 justify-between">
			<button
				class="bg-white border-black font-black border-2 rounded-full w-fit py-3 px-8 hover:bg-gray-100"
				>Registrer deg</button
			>

			<button
				class="bg-white border-black font-black border-2 rounded-full w-fit py-3 px-8 hover:bg-gray-100"
				>Allerede bruker?</button
			>
		</div>
	</form>
</div>
