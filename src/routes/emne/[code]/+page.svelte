<script lang="ts">
	import { page } from '$app/stores';
	import { formatCourse } from '$lib/format-course';
	import { format } from '$lib/date';

	let { data } = $props();

	const weeks = formatCourse(data.course, 'week');
</script>

<svelte:head>
	<title>{$page.params['code']} - Timeplan</title>
</svelte:head>

<div class="bg-white border-2 border-black p-8 rounded-[36px] space-y-8">
	<div class="space-y-2">
		<h2 class="text-2xl font-bold">Timeplan</h2>

		{#each Object.keys(weeks) as week}
			{#if weeks[week].length > 0}
				<h2 class="text-2xl font-medium my-3 underline">Uke {week}</h2>
			{/if}
			<ul class="flex flex-col divide-y">
				{#each weeks[week] as event}
					<li class="py-2">
						<h3 class="text-xl font-medium">{event.title}</h3>
						<p>Fra: {format(event.startTime)}</p>
						<p>Til: {format(event.endTime)}</p>
						<p>Rom: {event['room']}</p>

						{#if event.staffs.length > 0}
							<p>
								Fagperson: {event.staffs.join(', ')}
							</p>
						{/if}
					</li>
				{/each}
			</ul>
		{/each}
	</div>
</div>
