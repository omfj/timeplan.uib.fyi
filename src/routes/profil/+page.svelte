<script lang="ts">
	import { getUserContext } from '$lib/stores/user.svelte';

	let user = getUserContext();
</script>

<div class="bg-white border-2 border-black p-8 space-y-6 rounded-[36px]">
	<h1 class="text-3xl font-black mb-5">Din profil</h1>

	<div class="space-y-2">
		<h2 class="text-xl font-black">Bruker</h2>

		<div>
			<p class="text-xl"><span class="font-bold">Navn:</span> {user?.name}</p>
			<p class="text-xl"><span class="font-bold">E-post:</span> {user?.email}</p>
		</div>
	</div>
</div>
