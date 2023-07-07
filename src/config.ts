export type TEnvironment = 'local' | 'development' | 'test' | 'staging' | 'production';

const nodeEnv = import.meta.env.MODE as string;

function assertNodeEnv(env: string | undefined): asserts env {
  if (!env) {
    throw Error('NODE ENV must be specified');
  }
}
assertNodeEnv(nodeEnv);

export class Config {
  static get api(): { apiKey: string; host: string } {
    return { apiKey: import.meta.env.VITE_API_KEY as string, host: import.meta.env.VITE_API_HOST as string };
  }

  static get brandName(): string {
    return import.meta.env.VITE_BRAND_NAME as string;
  }

  static get environment(): TEnvironment {
    return nodeEnv as TEnvironment;
  }

  static get sentryDsn(): string {
    return import.meta.env.VITE_SENTRY_DSN as string;
  }
//TODO: CHECK IF THIS IS OKAY TO COMMENT OUT, AND CHECK HTTPCLIENT CHANGES WITH SENIOR
  // static get reactQuery(): ReactQueryOptions {
  //   const handleUnauthorizedCalls = (error: TApiError) => {
  //     if (error.statusCode === HttpStatus.Unauthorized && !window.location.href.includes('/auth')) {
  //       // do authenticate call again, redirect to login onError
  //       new QueryClient().invalidateQueries('authenticate');
  //     }
  //   };
  //   return {
  //     mutations: {
  //       onError: handleUnauthorizedCalls,
  //       retry: false
  //     },
  //     queries: {
  //       onError: handleUnauthorizedCalls,
  //       refetchOnWindowFocus: false,
  //       retry: false,
  //       staleTime: 1000 * 60 // 1 minute
  //     }
  //   };
  // }
}

export default Config;
