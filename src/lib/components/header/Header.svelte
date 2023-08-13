<script lang="ts">
	import { enhance } from '$app/forms';
	import { user } from '$lib/stores/user';
	import HeaderItem from './HeaderItem.svelte';
	import Icon from '@iconify/svelte';
	import { isOpen } from '$lib/stores/menu';
	import { navigating } from '$app/stores';

	const toggleMenu = () => {
		isOpen.update((state) => !state);
	};

	let screenWidth: number;

	$: if ($navigating) $isOpen = false;
</script>

<svelte:window bind:innerWidth={screenWidth} />

<div class="p-4 sticky top-0">
	<header
		class="flex flex-col max-w-4xl w-full mx-auto border-2 border-black rounded-[36px] px-8 py-2 bg-white"
	>
		<div class="flex items-center justify-between">
			<a href="/">
				<h1 class="text-3xl font-black py-2 hover:underline">Timeplan</h1>
			</a>

			<nav class="hidden md:block ml-5">
				<ul class="flex gap-2">
					{#if $user}
						<HeaderItem to="/profile">Min profil</HeaderItem>
						<li>
							<form action="/logout" method="POST" use:enhance>
								<button
									class="block px-4 py-1 rounded-full border-2 border-black font-bold hover:bg-gray-100"
									type="submit">Logg ut</button
								>
							</form>
						</li>
					{:else}
						<HeaderItem to="/login">Logg inn</HeaderItem>
						<HeaderItem to="/register">Registrer deg</HeaderItem>
					{/if}
				</ul>
			</nav>
			<button on:click={toggleMenu} class="block md:hidden border-2 border-black rounded-full p-1">
				{#if $isOpen}
					<Icon icon="mdi:close" class="w-6 h-6 font-bold" />
				{:else}
					<Icon icon="mdi:menu" class="w-6 h-6 font-bold" />
				{/if}
			</button>
		</div>
		{#if $isOpen}
			<nav class="py-4">
				<ul class="flex flex-col gap-2">
					<li>
						<a href="/" class="text-xl font-black hover:underline">Hjem</a>
					</li>

					{#if !$user}
						<li>
							<a href="/login" class="text-xl font-black hover:underline">Logg inn</a>
						</li>
						<li>
							<a href="/register" class="text-xl font-black hover:underline">Registrer deg</a>
						</li>
					{/if}

					{#if $user}
						<li>
							<form action="/logout" method="post" use:enhance>
								<button class="text-xl font-black hover:underline">Logg ut</button>
							</form>
						</li>
					{/if}
				</ul>
			</nav>
		{/if}
	</header>
</div>
