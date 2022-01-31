import type { Adventure, Picture } from '~/config/types';
import marked from 'marked';
import Slider from '~/components/slider';
import TopoLink from '~/components/topoLink';
import AdventureCard from '~/components/adventures/adventureHeader';
import Container from '~/components/container';
import { formatFrenchDate } from '~/utils/date';
import { slugify, truncateText } from '~/utils/string';
import { getUrlWithNewSlug } from '~/utils/url';
import uniqBy from 'lodash/uniqBy.js';
import findIndex from 'lodash/findIndex.js';
// import { sliderRef } from '~/stores/slider';
import type { LightGallery } from 'lightgallery/lightgallery';
import { getCoverPicture } from '~/services/adventureService';
import { MetaFunction } from 'remix';

type PropsType = {
	adventure: Adventure
}

export const meta: MetaFunction = ({ data: { adventure } }) => {
	return {
		"og:image": getCoverPicture(adventure)?.formats.medium.url || '',
		"og:title": adventure.title,
		"og:description": adventure.short_description || truncateText(adventure.description)
	}
}

export default ({ adventure }: PropsType) => {
	// sliderRef.subscribe((galleryInstance: LightGallery | null) => {
	// 	if (!galleryInstance) return;
	// 	gallery = galleryInstance;
	// });

	// adventureSlug = slugify(adventure.title);
	// if (browser) pageUrl = getUrlWithNewSlug(location, adventureSlug);
	// if (browser && $page.params.slug !== adventureSlug)
	// 	window.history.replaceState(null, '', pageUrl);

	const coverPicture = getCoverPicture(adventure)

	const pictures =
		coverPicture !== null
			? uniqBy([coverPicture, ...adventure.pictures], 'id')
			: adventure.pictures;

	// const openSlider = () => {
	// 	if (!coverPicture) return;
	// 	gallery.openGallery(findIndex(pictures, ['id', coverPicture.id]));
	// };

	return (
		<>
			{/* <AdventureCard adventure={adventure} onClick={openSlider} /> */}
			<AdventureCard adventure={adventure} />
			<Container>
				<p className={`text-justify text-gray-800 text-xl font-sans font-thin leading-relaxed`}>
					{adventure.date &&
						<>
							<span className="italic">{formatFrenchDate(adventure.date)}</span>
							<br />
							<br />
						</>
					}
					<span dangerouslySetInnerHTML={marked(adventure.description || '')} />
				</p>
				<br />
				<br />
				{adventure.topo?.length > 0 &&
					<>
						<b>Topo</b> :
						{adventure.topo.map(topo => (
							<>
								<TopoLink topo={topo} />
								<br />
							</>
						))}
					</>
				}
				{adventure.pictures?.length > 0 &&
					<div className="mt-5" id="slider">
						<Slider pictures={pictures} />
					</div>
				}
			</Container>
		</>
	)
}
