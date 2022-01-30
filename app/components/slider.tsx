import { formatAssetUrl } from '~/services/adventureService';
import type { Picture } from '~/config/types';
// import { sliderRef } from '~/config/stores/slider';
import isMobile from '~/utils/isMobile';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import { useEffect } from 'react';

type PropsType = {
	pictures: Picture[],
	galleryName: string
}

export default ({ pictures = [], galleryName = 'slider' }: PropsType) => {
	useEffect(() => {
		const setupGallery = async () => {
			const { default: lightGallery } = await import('lightgallery');
			const { default: lgZoom } = await import('lightgallery/plugins/zoom/lg-zoom.umd');

			const plugins = [lgZoom];

			if (!isMobile()) {
				const { default: lgThumbnail } = await import(
					'lightgallery/plugins/thumbnail/lg-thumbnail.umd'
				);
				plugins.push(lgThumbnail);
			}

			const gallery = lightGallery(document.getElementById('lightgallery'), {
				plugins,
				speed: 500,
				mobileSettings: { showCloseIcon: true }
			});

			// sliderRef.set(gallery);
		}
		setupGallery()
  }, []);

	return (
		<div
			id={galleryName}
			className="cursor-pointer w-full h-40 overflow-x-scroll overflow-y-hidden whitespace-nowrap"
		>
			{pictures.filter(picture => !!picture.url).map((picture: Picture) => (
				<a
					className="inline-block mr-2 h-full"
					data-lg-size={`${picture.width}-${picture.height}`}
					data-src={formatAssetUrl(picture.url)}
				>
					<img
						alt={picture.alternativeText}
						src={formatAssetUrl(picture.formats.small.url)}
						className="h-full object-contain"
					/>
				</a>
			))}
		</div>
	)
}
