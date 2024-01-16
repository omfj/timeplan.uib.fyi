<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		href: string;
		children: Snippet<void>;
	};

	let { href, children } = $props<Props>();
</script>

<li>
	<a class="block px-4 py-1 rounded-full border-2 border-black font-bold hover:bg-gray-100" {href}>
		{@render children()}
	</a>
</li>
