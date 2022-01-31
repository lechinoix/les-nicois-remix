<script lang="ts">
	import type { Adventure, Picture } from '$lib/types';
	import { page } from '$app/stores';
	import marked from 'marked';
	import Slider from '$lib/components/slider.svelte';
	import TopoLink from '$lib/components/topoLink.svelte';
	import AdventureCard from '$lib/components/adventures/adventureHeader.svelte';
	import Container from '$lib/components/container.svelte';
	import { formatFrenchDate } from '$lib/utils/date';
	import { slugify, truncateText } from '$lib/utils/string';
	import { getUrlWithNewSlug } from '$lib/utils/url';
	import { browser } from '$app/env';
	import uniqBy from 'lodash/uniqBy.js';
	import findIndex from 'lodash/findIndex.js';
	import { typography } from '$lib/styles';
	import { sliderRef } from '$lib/stores/slider';
	import type { LightGallery } from 'lightgallery/lightgallery';
	import { getCoverPicture } from '$lib/services/adventureService';

	export let adventure: Adventure;

	let coverPicture: Picture | null;
	let adventureSlug: string;
	let pageUrl: string;
	let pictures: Picture[];
	let gallery: LightGallery;

	sliderRef.subscribe((galleryInstance: LightGallery | null) => {
		if (!galleryInstance) return;
		gallery = galleryInstance;
	});

	$: {
		adventureSlug = slugify(adventure.title);
		if (browser) pageUrl = getUrlWithNewSlug(location, adventureSlug);
		if (browser && $page.params.slug !== adventureSlug)
			window.history.replaceState(null, '', pageUrl);
	}
	$: coverPicture = getCoverPicture(adventure);
	$: pictures =
		coverPicture !== null
			? uniqBy([coverPicture, ...adventure.pictures], 'id')
			: adventure.pictures;

	const openSlider = () => {
		if (!coverPicture) return;
		gallery.openGallery(findIndex(pictures, ['id', coverPicture.id]));
	};
</script>

<svelte:head>
	{#if coverPicture}
		<meta property="og:image" content={coverPicture.formats.medium.url} />
	{/if}
	<meta property="og:url" content={pageUrl} />
	<meta property="og:title" content={adventure.title} />
	<meta
		property="og:description"
		content={adventure.short_description || truncateText(adventure.description)}
	/>
</svelte:head>

<AdventureCard {adventure} onClick={openSlider} />
<Container>
	<p class={`text-justify ${typography.text}`}>
		{#if adventure.date}
			<span class="italic">{formatFrenchDate(adventure.date)}</span>
			<br />
			<br />
		{/if}
		<span>{@html marked(adventure.description || '')}</span>
	</p>
	<br />
	<br />
	{#if adventure.topo?.length > 0}
		<b>Topo</b> :
		{#each adventure.topo as topo}
			<TopoLink {topo} />
			<br />
		{/each}
	{/if}
	{#if adventure.pictures?.length > 0}
		<div class="mt-5" id="slider">
			<Slider {pictures} />
		</div>
	{/if}
</Container>
