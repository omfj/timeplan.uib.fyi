<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/cn';
	import { formatFromTo } from '$lib/date';
	import { groupCourseBy } from '$lib/format-course.js';
	import { unique } from '$lib/utils';
	import { getWeek } from 'date-fns';

	let { data } = $props();

	const weeks = groupCourseBy(data.course, 'week');

	let titles = unique(data.course.map((event) => event.title));

	let filteredTitles = $state(titles);
	let showFromWeek = $state(1);
</script>

<svelte:head>
	<title>{$page.params['code']} - Timeplan</title>
</svelte:head>

<div class="bg-white border-2 border-black p-8 rounded-[36px] space-y-8">
	<h2 class="text-3xl font-bold text-center">
		Timeplan for
		<span class="font-serif italic">
			{$page.params['code']}
		</span>
	</h2>

	{#if titles.length > 0}
		<div>
			<button
				onclick={() => (filteredTitles = titles)}
				class="px-4 py-1 rounded-full border-2 border-black font-bold hover:bg-gray-100"
				>Velg alle</button
			>
			<button
				onclick={() => (filteredTitles = [])}
				class="px-4 py-1 rounded-full border-2 border-black font-bold hover:bg-gray-100"
				>Fjern alle</button
			>
		</div>

		<div class="flex flex-row gap-1 flex-wrap">
			{#each titles as title}
				<button
					class={cn('px-4 py-1 rounded-full border-2 border-black font-bold hover:bg-gray-100', {
						'bg-purple-200': filteredTitles.includes(title)
					})}
					onclick={() => {
						if (filteredTitles.includes(title)) {
							filteredTitles = filteredTitles.filter((t) => t !== title);
						} else {
							filteredTitles.push(title);
						}
					}}
				>
					{title}
				</button>
			{/each}
		</div>
	{/if}

	<div>
		{#each Object.keys(weeks) as week}
			{@const events = weeks[week].filter(
				(event) => filteredTitles.includes(event.title) && event.week >= showFromWeek
			)}
			{#if events.length > 0}
				<h2 class="text-2xl font-medium my-3 underline">Uke {week}</h2>
			{/if}

			<ul class="flex flex-col divide-y">
				{#each events as event}
					<li class="py-2">
						<h3 class="text-xl font-medium">{event.title}</h3>
						<p>Tid: {formatFromTo(event.startTime, event.endTime)}</p>
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
