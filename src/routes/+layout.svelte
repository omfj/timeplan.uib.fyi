<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header';
	import Footer from '$lib/components/footer';
	import { setUserContext } from '$lib/stores/user.svelte';
	import { Toaster } from 'svelte-sonner';

	let { data, children } = $props();

	setUserContext(data.user);
</script>

<Toaster />

<div class="flex flex-col min-h-screen">
	<Header />

	<main class="max-w-4xl mx-auto w-full py-8 px-2">
		{@render children()}
	</main>

	<div class="flex-grow"></div>

	<Footer />
</div>
