<script context="module" lang="ts">
	import type { LoadInput } from '@sveltejs/kit';
	import { getPreviewById } from '$lib/services/adventureService';

	export async function load({ page }: LoadInput) {
		const adventure = await getPreviewById(page.params.id, page.query.get('token'));
		return {
			props: { adventure }
		};
	}
</script>

<script lang="ts">
	import type { Adventure } from '$lib/types';

	import AdventurePage from './_components/adventurePage.svelte';

	export let adventure: Adventure;
</script>

<AdventurePage {adventure} />
