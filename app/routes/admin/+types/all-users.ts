import type { LoaderFunctionArgs } from "react-router";

export namespace Route {
  export type LoaderData = {
    users: Array<{
      name: string;
      email: string;
      imageUrl: string;
      joinedAt: string;
      status: string;
    }>;
    total: number;
  };

  export type ComponentProps = {
    loaderData: LoaderData;
  };
} 