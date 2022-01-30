import type { LoaderFunction } from "remix";
import React from "react";
import { useLoaderData } from "remix";
import { getAdventuresDone } from "~/services/adventureService";
import { Adventure } from "~/config/types";
import { formatFrenchDate } from "~/utils/date";

export const loader: LoaderFunction = getAdventuresDone;

const Posts: React.FC = () => {
  const adventures = useLoaderData<Adventure[]>();

  return (
    <>
      {adventures.map(adventure => {
        return (
          <article key={adventure.id}>
            <h1>{adventure.title}</h1>
            <time dateTime={adventure.date}>{formatFrenchDate(adventure.date)}</time>
            {/* Reminder that this can in fact be dangerous
                https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml */}
            <div dangerouslySetInnerHTML={{ __html: adventure.description }} />
          </article>
        );
      })}
    </>
  );
};
export default Posts;