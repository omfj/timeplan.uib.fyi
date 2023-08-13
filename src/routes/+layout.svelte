<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header';
	import { Toaster } from 'svelte-sonner';
	import { user } from '$lib/stores/user';
	import type { LayoutServerData } from './$types';
	import Footer from '$lib/components/footer';

	export let data: LayoutServerData;

	$: user.set(data.user);
</script>

<div class="flex flex-col min-h-screen">
	<Header />

	<main class="max-w-4xl mx-auto w-full py-8 px-4">
		<slot />
	</main>

	<div class="flex-grow" />

	<Footer />
</div>

<Toaster />
