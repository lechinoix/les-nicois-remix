import type { LoaderFunction, MetaFunction } from "remix";
import React from "react";
import { useLoaderData } from "remix";
import { getAdventuresDone } from "~/services/adventureService";
import { Adventure } from "~/config/types";
import { truncateText } from "~/utils/string";
import AdventureCard from '~/components/adventures/adventureHeader'

export const loader: LoaderFunction = getAdventuresDone;

export const meta: MetaFunction = ({ data: adventures }) => {
  const latestAdventurePictureUrl = adventures[0].cover_picture.picture.formats.medium.url
  return {
    'og:image': latestAdventurePictureUrl,
    'og:title':"Nos aventures",
    'og:description':"La liste de toutes les aventures",
  }
}

const Posts: React.FC = () => {
  const adventures = useLoaderData<Adventure[]>();

  return (
    <>
      {adventures.map(adventure => (
        <AdventureCard adventure={adventure} key={adventure.id}>
          <p className="text-justify text-gray-800 text-xl font-serif font-light leading-relaxed pt-7">
            {adventure.short_description || truncateText(adventure.description)}
          </p>
        </AdventureCard>
      ))}
    </>
  );
};
export default Posts;