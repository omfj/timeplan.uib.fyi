<script lang="ts">
	export let to: string;
</script>

<li>
	<a
		class="block px-4 py-1 rounded-full border-2 border-black font-bold hover:bg-gray-100"
		href={to}
	>
		<slot />
	</a>
</li>
