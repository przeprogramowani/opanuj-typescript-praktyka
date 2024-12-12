import axios from 'axios';
import { Product } from '../model/Product';
import { trackSlowRequests } from './tracker';
import { RequestConfig } from '../model/RequestConfig';
const productsApi = axios.create({
  baseURL: 'https://dummyjson.com',
});

productsApi.interceptors.request.use((config) => {
  (config as RequestConfig).metadata = { startTime: new Date() };
  return config;
});

productsApi.interceptors.response.use((response) => {
  const endTime = new Date();
  const startTime = (response.config as RequestConfig).metadata.startTime;
  const duration = endTime.getTime() - startTime.getTime();

  if (duration > 2000) {
    trackSlowRequests(response.config as RequestConfig);
  }

  return response;
});

export async function getProducts(query: string, limit: number = 5, delay: number = 0) {
  const response = await productsApi.get<{ products: Product[] }>('/products/search', {
    params: {
      q: query,
      limit: limit,
      delay: delay,
    },
  });
  return response;
}
