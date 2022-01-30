import config from '~/config/env';
import type { Sport } from '~/config/types';

export const getSportBySlug = async (fetch: any, sportSlug: string): Promise<Sport> => {
	const res = await fetch(`${config.BASE_API_URL}/sports?slug=${sportSlug}`);
	if (!res.ok) throw new Error(res.statusText);

	const sports = await res.json();

	if (sports.length === 0) throw new Error('Unkown sport');

	return sports[0];
};

export const getAllSports = async (fetch: any): Promise<Sport[]> => {
	const res = await fetch(`${config.BASE_API_URL}/sports`);
	if (!res.ok) throw new Error(res.statusText);

	const sports = await res.json();

	if (sports.length === 0) throw new Error('Unkown sport');

	return sports.filter((sport) => sport.adventures.length > 0);
};
