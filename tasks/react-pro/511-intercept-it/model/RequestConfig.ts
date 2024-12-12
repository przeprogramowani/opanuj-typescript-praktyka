import { InternalAxiosRequestConfig } from 'axios';

export interface RequestConfig extends InternalAxiosRequestConfig {
  metadata: {
    startTime: Date;
  };
}
