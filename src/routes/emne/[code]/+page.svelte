<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { formatCourse } from '$lib/format-course';
	import Icon from '@iconify/svelte';
	import { format } from '$lib/date';
	import { getGroups } from './utils';
	import { cn } from '$lib/cn';

	export let data: PageData;
	const { course } = data;

	const weeks = formatCourse(course, 'week');
	const groups = getGroups(course);

	let starred = false;
</script>

<svelte:head>
	<title>{$page.params['code'].toUpperCase()} - Timeplan</title>
</svelte:head>

<div class="bg-white border-2 border-black p-8 rounded-[36px] space-y-8">
	<div class="flex items-center gap-2">
		<button on:click={() => (starred = !starred)}>
			<Icon icon={starred ? 'mdi:star' : 'mdi:star-outline'} class="w-8 h-8" />
		</button>
		<h1 class="text-5xl uppercase font-extrabold">
			{$page.params['code']}
		</h1>
	</div>

	<div class="space-y-2">
		<h2 class="text-2xl font-bold">Filtrer grupper</h2>

		<div class="flex flex-wrap gap-2">
			{#each groups as { title, show }, i}
				<button
					class={cn('px-3 py-2 border-2 border-black hover:bg-gray-200 rounded-full font-bold', {
						'bg-green-200': show
					})}
					on:click={() => (groups[i].show = !groups[i].show)}
				>
					{title}
				</button>
			{/each}
		</div>
	</div>

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
