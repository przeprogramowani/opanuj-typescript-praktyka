import { setupServer } from 'msw/node';
import { http, HttpResponse, HttpHandler, delay } from 'msw';
import { vi, beforeAll, afterAll, afterEach } from 'vitest';

const getQueryParams = (url: string): Record<string, string> => {
  const searchParams = new URL(url).searchParams;
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

const withOptionalDelay = (handler: () => HttpResponse) => {
  return async ({ request }: { request: Request }) => {
    const queryParams = getQueryParams(request.url);
    if (queryParams.delay) {
      await delay(parseInt(queryParams.delay));
    }
    return handler();
  };
};

const restHandlers = [
  http.get(
    'https://dummyjson.com/products/search',
    withOptionalDelay(() => {
      return HttpResponse.json({
        products: [],
      });
    }),
  ),

  http.post('http://localhost:3000/api/tracker', () => {
    return HttpResponse.json({
      success: true,
    });
  }),
];

export function setupMockServer() {
  const server = setupServer(...restHandlers);

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
    vi.useRealTimers();
  });

  const verifyRequest = (requestUrl: string, requestMethod: string) => {
    const handlers = server.listHandlers();
    return handlers.some((handler) => {
      const {
        isUsed,
        info: { method, path },
      } = handler as HttpHandler;
      return isUsed && method === requestMethod && path === requestUrl;
    });
  };

  return { verifyRequest };
}
