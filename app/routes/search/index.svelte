<script context="module" lang="ts">
	import { getAllAdventures } from '$lib/services/adventureService';

	export const prerender = true;
	export async function load() {
		const adventures = await getAllAdventures();
		return {
			props: { adventures }
		};
	}
</script>

<script lang="ts">
	import AdventureCard from '$lib/components/adventures/adventureCard.svelte';
	import type { Adventure } from '$lib/types';
	import VirtualList from '@sveltejs/svelte-virtual-list';

	export let adventures: Adventure[];
</script>

<main class="h-screen pt-20 grid grid-cols-2">
	<section class="h-full overflow-hidden pl-3">
		<VirtualList items={adventures} let:item>
			<AdventureCard adventure={item} />
		</VirtualList>
	</section>
	<section>
		<img src="/img/fake-map.png" />
	</section>
</main>
