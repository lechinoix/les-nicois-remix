<script context="module">
	export const prerender = true;
	export async function load() {
		const adventures = await getAdventuresDone();
		return {
			props: { adventures }
		};
	}
</script>

<script lang="ts">
	import { HOMEPAGE_US_IMAGE_URL } from '$lib/constants';
	import type { Adventure } from '$lib/types';
	import { getAdventuresDone } from '$lib/services/adventureService';
	import { truncateText } from '$lib/utils/string';
	import AdventureCard from '$lib/components/adventures/adventureHeader.svelte';

	export let adventures: Adventure[];

	let latestAdventurePictureUrl = HOMEPAGE_US_IMAGE_URL;

	$: if (adventures?.length > 0 && adventures[0].cover_picture)
		latestAdventurePictureUrl = adventures[0].cover_picture.picture.formats.medium.url;
</script>

<svelte:head>
	<meta property="og:image" content={latestAdventurePictureUrl} />
	<meta property="og:title" content="Nos aventures" />
	<meta property="og:description" content="La liste de toutes les aventures" />
</svelte:head>

{#each adventures as adventure}
	<AdventureCard {adventure}>
		<p class="text-justify text-gray-800 text-xl font-serif font-light leading-relaxed pt-7">
			{adventure.short_description || truncateText(adventure.description)}
		</p>
	</AdventureCard>
{/each}
