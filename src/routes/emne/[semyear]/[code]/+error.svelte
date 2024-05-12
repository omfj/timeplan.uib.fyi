<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="bg-white border-2 border-black text-center flex flex-col gap-4 p-8 rounded-[36px]">
	<h3 class="text-4xl md:text-5xl font-black">
		{$page.status}
	</h3>

	<p>
		{$page.error?.message}
	</p>
</div>
