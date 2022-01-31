import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LoaderFunction,
  MetaFunction,
  useLoaderData
} from "remix";
import tailwind from "./styles/app.css";
import type { Sport } from '~/config/types';
import Header, { links as headerLinks } from '~/components/newHeader/index';
import { DEFAULT_TITLE } from '~/config/constants';
import { getAllSports } from '~/services/sportService';

type LoaderDataType = Sport[];

export const loader: LoaderFunction = async (): Promise<LoaderDataType> => {
	let sports = await getAllSports(fetch);

	return sports;
}

export function links() {
  return [...headerLinks(), { rel: "stylesheet", href: tailwind }];
}

export const meta: MetaFunction = () => {
  return { title: DEFAULT_TITLE };
};

export default function App() {
  const sports = useLoaderData<LoaderDataType>()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header sports={sports} />
				<div className="pb-14">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
