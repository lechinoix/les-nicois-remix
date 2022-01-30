import type { Sport } from '~/config/types';
import { ROUTES } from '~/config/routes';
import BurgerIcon from './burgerIcon';
import { useState } from 'react';

type PropsType ={ sports: Sport[] };

// <svelte:body on:click={closeMenu} />

export default ({ sports }: PropsType) => {
	let [isOpen, setIsOpen] = useState<boolean>(false);

	const openMenu = (event: any) => {
		if (!isOpen) event.stopPropagation();
		setIsOpen(true);
	};
	const closeMenu = () => {
		setIsOpen(false);
	};

	return (
		<nav className="absolute bg-linear-b-w py-5 z-10 mx-auto w-full px-5" style={{background: 'linear-gradient(rgba(0, 0, 0, 0.5) 95%, rgba(0, 0, 0, 0))'}}>
			<div className="flex items-start justify-between items-center">
				<a href={ROUTES.HOME} className="flex items-center">
					<img src="/img/les-nicois.png" alt="Un dessin d'Ambre et Nicolas grimpant" className="w-14" />
					<span className="text-2xl text-white font-extralight ml-4"> Les Niçois en Vadrouille </span>
				</a>
				<BurgerIcon isOpen={isOpen} onClick={openMenu} ratio={3} />
			</div>
			<div className="flex flex-col items-end">
				{isOpen && (
					<div className="pt-3">
						{sports.map(sport => (
							<a
								href={`/sport/${sport.slug}`}
								className="flex text-white block px-4 py-2 text-sm justify-start items-center uppercase"
								role="menuitem"
							>
								<p>{sport.name} ({sport.adventures.length})</p>
							</a>
						))}
					</div>
				)}
			</div>
		</nav>
	)
}
