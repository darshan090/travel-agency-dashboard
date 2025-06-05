import type { LoaderFunctionArgs } from "react-router";

export namespace Route {
  export type LoaderData = {
    name: string;
    email: string;
    imageUrl: string;
    joinedAt: string;
    status: string;
  } | null;

  export type ComponentProps = {
    loaderData: LoaderData;
  };
} 