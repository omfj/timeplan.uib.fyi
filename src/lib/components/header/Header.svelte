<script lang="ts">
	import { enhance } from '$app/forms';
	import HeaderItem from './HeaderItem.svelte';
	import Icon from '@iconify/svelte';
	import { createNavMenuStore } from '$lib/stores/menu.svelte';
	import { getUserContext } from '$lib/stores/user.svelte';

	let navMenu = createNavMenuStore();
	let user = getUserContext();
</script>

{#if navMenu.isOpen}
	<div
		onclick={() => (navMenu.isOpen = false)}
		aria-hidden={true}
		class="fixed inset-0 bg-black/20 bg-opacity-50 backdrop-blur-sm z-30"
	/>
{/if}

<div class="p-4 sticky z-40 top-0">
	<header
		class="flex flex-col max-w-4xl w-full mx-auto border-2 border-black rounded-[36px] px-8 py-2 bg-white"
	>
		<div class="flex items-center justify-between">
			<a href="/">
				<h1 class="text-3xl font-black py-2 hover:underline">Timeplan</h1>
			</a>

			<nav class="hidden md:block ml-5">
				<ul class="flex gap-2">
					{#if user}
						<HeaderItem href="/profile">Min profil</HeaderItem>
						<li>
							<HeaderItem href="/api/auth/logout">Logg ut</HeaderItem>
						</li>
					{/if}

					{#if !user}
						<HeaderItem href="/logg-inn">Logg inn</HeaderItem>
					{/if}
				</ul>
			</nav>
			<button
				onclick={navMenu.toggle}
				class="block md:hidden border-2 border-black rounded-full p-1"
			>
				{#if navMenu.isOpen}
					<Icon icon="mdi:close" class="w-6 h-6 font-bold" />
				{:else}
					<Icon icon="mdi:menu" class="w-6 h-6 font-bold" />
				{/if}
			</button>
		</div>
		{#if navMenu.isOpen}
			<nav class="py-4">
				<ul class="flex flex-col gap-2">
					<li>
						<a href="/" class="text-xl font-black hover:underline">Hjem</a>
					</li>

					{#if !user}
						<li>
							<a href="/login" class="text-xl font-black hover:underline">Logg inn</a>
						</li>
						<li>
							<a href="/register" class="text-xl font-black hover:underline">Registrer deg</a>
						</li>
					{/if}

					{#if user}
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
