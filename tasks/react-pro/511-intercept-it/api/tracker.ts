import { RequestConfig } from '../model/RequestConfig';
import axios from 'axios';

export function trackSlowRequests(request: RequestConfig) {
  const endTime = new Date();
  const startTime = request.metadata.startTime;
  const duration = endTime.getTime() - startTime.getTime();

  axios.post('/api/tracker', {
    duration,
    url: request.url,
  });
}
