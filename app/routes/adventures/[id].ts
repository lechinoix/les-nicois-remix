// import { ROUTES } from '~/config/routes';
// import { getAdventureById } from '~/services/adventureService';
// import { slugify } from '~/utils/string';

// export async function get({ params }): Promise<EndpointOutput> {
// 	const adventure = await getAdventureById(params.id);
// 	return {
// 		status: 302,
// 		headers: { Location: `${ROUTES.ADVENTURES.BY_ID}${params.id}_${slugify(adventure.title)}` }
// 	};
// }

export default () => null
