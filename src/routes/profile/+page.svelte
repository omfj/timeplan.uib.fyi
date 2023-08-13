<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { user } = data;
</script>

<div class="bg-white border-2 border-black p-8 space-y-6 rounded-[36px]">
	<h1 class="text-3xl font-black mb-5">Din profil</h1>

	<div class="space-y-2">
		<h2 class="text-xl font-black">Bruker</h2>

		<div>
			<p class="text-xl"><span class="font-bold">Brukernavn: </span>{user.username}</p>
			<p class="text-xl"><span class="font-bold">E-post: </span>{user.email}</p>
		</div>
	</div>

	<div class="space-y-2">
		<h2 class="text-xl font-black">Dine fag</h2>

		<p>Finner ingen fag</p>
	</div>
</div>
