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

  http.get('https://dummyjson.com/quotes', ({ request }) => {
    const queryParams = getQueryParams(request.url);
    return HttpResponse.json({
      quotes: [],
      total: 50,
      skip: parseInt(queryParams.skip),
      limit: parseInt(queryParams.limit),
    });
  }),

  http.post('http://localhost:3000/api/tracker', () => {
    return HttpResponse.json({
      success: true,
    });
  }),
];

export function setupMockServer() {
  const server = setupServer(...restHandlers);
  let requestLog: Request[] = [];

  server.events.on('request:start', async ({ request }) => {
    requestLog.push(request);
  });

  const verifyRequest = (requestUrl: string, requestMethod: string) => {
    return requestLog.some(
      (request) => request.url === requestUrl && request.method === requestMethod,
    );
  };

  const verifyRequestCount = (requestUrl: string, requestMethod: string) => {
    const matchingRequests = requestLog.filter(
      (request) => request.url === requestUrl && request.method === requestMethod,
    );
    return matchingRequests.length;
  };

  const resetHandlers = () => {
    server.resetHandlers();
    requestLog = [];
  };

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterAll(() => {
    server.close();
    vi.useRealTimers();
  });

  return { verifyRequest, verifyRequestCount, resetHandlers };
}
