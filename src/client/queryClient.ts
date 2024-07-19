import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Config, defaultConfig } from '../config';
import { QueryRequest, QueryRowsResponse, QueryTuplesResponse } from '../types/queryTypes';

export class QueryClient {
  private axiosInstance: AxiosInstance;

  constructor(private config: Config = defaultConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.apiUrl
    });
  }

  public async getAllRows(query: QueryRequest, requestId?: string, isQueued: boolean = true): Promise<AxiosResponse<QueryRowsResponse>> {
    try {
      const response = await this.axiosInstance.post<QueryRowsResponse>('/api/v2/query/rows', query, {
        headers: {
          'x-request-id': requestId ?? '',
          'is-queued': isQueued.toString(),
        },
      });
      return response;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  public async getTuples(query: QueryRequest): Promise<AxiosResponse<QueryTuplesResponse>> {
    try {
      const response = await this.axiosInstance.post<QueryTuplesResponse>('/api/v2/query/tuples', query);
      return response;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  public async executeQuery(query: QueryRequest, requestId: string): Promise<AxiosResponse<QueryTuplesResponse>> {
    try {
      const response = await this.axiosInstance.post<QueryTuplesResponse>('/api/v2/query/exec', query, {
        headers: {
          'x-request-id': requestId,
        },
      });
      return response;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  public async convertAndExecuteQuery(query: QueryRequest, requestId: string): Promise<QueryTuplesResponse> {
    const headers: any = {
      'x-request-id': requestId,
    };

    const response = await this.axiosInstance.post<QueryTuplesResponse>(`/api/v2/query/query`, query, { headers });
    return response.data;
  }

  public async convertQuery(query: QueryRequest, requestId: string): Promise<string> {
    const headers: any = {
      'x-request-id': requestId,
    };

    const response = await this.axiosInstance.post<string>(`/api/v2/query/convert/query`, query, { headers });
    return response.data;
  }

  private handleAxiosError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || error.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
