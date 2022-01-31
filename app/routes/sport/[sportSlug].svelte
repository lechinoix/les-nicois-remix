<script context="module" lang="ts">
	import type { LoadInput } from '@sveltejs/kit';

	export const prerender = true;
	export async function load({ page, fetch }: LoadInput) {
		const sport = await getSportBySlug(fetch, page.params.sportSlug);
		return {
			props: { sport }
		};
	}
</script>

<script lang="ts">
	import type { Adventure, Sport } from '$lib/types';
	import { getSportBySlug } from '$lib/services/sportService';
	import AdventureCover from '$lib/components/adventures/adventureCover.svelte';
	import { AdventureStatus, CoverTypes } from '$lib/constants';
	import LargeCover from '$lib/components/coverPicture/largeCover.svelte';
	import ResponsiveGrid from '$lib/components/ui/responsiveGrid.svelte';

	export let sport: Sport;

	$: sportTiles = sport.adventures
		.filter((adventure) => adventure.status === AdventureStatus.DONE)
		.sort((a: Adventure, b: Adventure) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.map((adventure) => ({
			component: AdventureCover,
			props: { adventure, coverType: CoverTypes.SMALL },
			key: `${adventure.id}`
		}));
</script>

<svelte:head>
	<meta property="og:image" content={sport.cover_picture.picture.formats.medium.url} />
	<meta property="og:title" content={sport.name} />
	<meta property="og:description" content={`Toutes les sorties de ${sport.name}`} />
</svelte:head>

{#if sport?.cover_picture}
	<LargeCover
		picture={sport.cover_picture.picture}
		position={sport.cover_picture.position}
		title={sport.name}
	/>
{/if}
<div class="my-7 mx-5 lg:mx-12 lg:my-10">
	<ResponsiveGrid items={sportTiles} />
</div>
