import { ROUTES } from '$lib/config/routes';
import { getAdventureById } from '$lib/services/adventureService';
import { slugify } from '$lib/utils/string';
import type { EndpointOutput } from '@sveltejs/kit';

export async function get({ params }): Promise<EndpointOutput> {
	const adventure = await getAdventureById(params.id);
	return {
		status: 302,
		headers: { Location: `${ROUTES.ADVENTURES.BY_ID}${params.id}_${slugify(adventure.title)}` }
	};
}
