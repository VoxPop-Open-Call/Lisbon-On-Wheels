import axios, { AxiosError, AxiosResponse, ResponseType } from 'axios';

import { Config } from '../config';
import { TApiError, TValidationError } from './HttpError';
import { HttpStatus } from './HttpStatus';

type TParams = Record<string, string | number | boolean | null | undefined>;
type THeaders = Record<string, string>;

class HttpClient {
  static getUrl(route: string): string {
    if (route.indexOf('http://') === 0 || route.indexOf('https://') === 0 || route.indexOf('www.') === 0) {
      return route;
    }
    return `${Config.api.host}${route}`;
  }

  static getUrlWithParams(route: string, params: TParams): string {
    let url = HttpClient.getUrl(route);
    if (params) {
      for (const property in params) {
        if (params[property] !== null && params[property] !== undefined) {
          url = HttpClient.addQueryStringParameter(url, property, `${params[property]}`);
        }
      }
    }
    return url;
  }

  static addQueryStringParameter(uri: string, key: string, value: string): string {
    const regex = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';
    if (uri.match(regex)) {
      return uri.replace(regex, `$1${key}=${value}$2`);
    }
    return `${uri + separator + key}=${value}`;
  }

  static parseRequestPayload<T extends { [key: string]: unknown }>(object: T): T {
    return Object.keys(object).reduce(
      (acc: T, key: string) => ({ ...acc, [key]: object[key] === '' ? null : object[key] }),
      {} as T
    );
  }

  static getBasicHeaders(): THeaders {
    const headers = {};
    return headers;
  }

  static createApiError(error: AxiosError): TApiError {
    if (error.response) {
      const data: {
        error?: string;
        message?: string | Array<TValidationError & { property: string }>;
        statusCode: HttpStatus;
      } = error.response.data;
      return {
        error: data.error,
        message: typeof data.message === 'string' ? data.message : undefined,
        statusCode: data.statusCode,
        validationErrors: Array.isArray(data.message)
          ? data.message.reduce(
              (acc: Record<string, TValidationError>, { property, ...validationError }) => ({
                ...acc,
                [property]: validationError
              }),
              {}
            )
          : undefined
      };
    }
    return {
      message: error.message,
      statusCode: HttpStatus.InternalServerError
    };
  }

  static async getRaw<T>(
    route: string,
    params: TParams = {},
    headers: THeaders = {},
    responseType: ResponseType = 'json'
  ): Promise<AxiosResponse<T>> {
    try {
      return await axios.get<T>(this.getUrlWithParams(route, params), {
        headers: { ...this.getBasicHeaders(), ...headers },
        responseType,
        withCredentials: true
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.createApiError(error);
      } else {
        throw error;
      }
    }
  }

  static async get<T>(
    route: string,
    params: TParams = {},
    headers: THeaders = {},
    responseType: ResponseType = 'json'
  ): Promise<T> {
    const result = await this.getRaw<T>(route, params, headers, responseType);
    return result.data;
  }

  static async put<T>(
    route: string,
    body: Record<string, unknown> = {},
    headers: THeaders = {},
    params: TParams = {}
  ): Promise<T> {
    try {
      const result = await axios.put<T>(this.getUrlWithParams(route, params), body, {
        headers: { ...this.getBasicHeaders(), ...headers },
        withCredentials: true
      });
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.createApiError(error);
      } else {
        throw error;
      }
    }
  }

  static async patch<T>(route: string, body: Record<string, unknown> = {}, headers: THeaders = {}): Promise<T> {
    try {
      const result = await axios.patch<T>(this.getUrl(route), body, {
        headers: { ...this.getBasicHeaders(), ...headers },
        withCredentials: true
      });
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.createApiError(error);
      } else {
        throw error;
      }
    }
  }

  static async post<T>(route: string, body: Record<string, unknown> = {}, headers: THeaders = {}): Promise<T> {
    try {
      const result = await axios.post<T>(this.getUrl(route), body, {
        headers: { ...this.getBasicHeaders(), ...headers },
        withCredentials: true
      });
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.createApiError(error);
      } else {
        throw error;
      }
    }
  }

  static async delete<T>(route: string, headers: THeaders = {}): Promise<T> {
    try {
      const result = await axios.delete(this.getUrl(route), {
        headers: { ...this.getBasicHeaders(), ...headers },
        withCredentials: true
      });
      return result.data || true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.createApiError(error);
      } else {
        throw error;
      }
    }
  }
}

export default HttpClient;
