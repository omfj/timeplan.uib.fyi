<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header';
	import { Toaster } from 'svelte-french-toast';
	import Footer from '$lib/components/footer';
	import { setUserContext } from '$lib/stores/user.svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	let { data } = $props();

	setUserContext(data.user);

	let webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');
</script>

<svelte:head>
	<title>uib.fyi</title>
	{@html webManifestLink}
</svelte:head>

<div class="flex flex-col min-h-screen">
	<Header />

	<main class="max-w-4xl mx-auto w-full py-8 px-4">
		<slot />
	</main>

	<div class="flex-grow" />

	<Footer />
</div>

<Toaster />
