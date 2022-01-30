export const getUrlWithNewSlug = (location: Location, slug: string): string => {
	const urlSlugMatcher = /^(.*)_[a-z-]*(.*)/;
	const [fullUrl, urlWithoutSlug, endOfUrl] = new RegExp(urlSlugMatcher).exec(location.href);

	return `${urlWithoutSlug}_${slug}${endOfUrl}`;
};
