/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import http from '../services/https';
import { getResError } from 'utils';

type Opts = {
  /**
   * Fetch data on mount
   * @default true
   */
  onMount?: boolean;
  defaultData?: any;
  query?: {
    [key: string]: any;
  };
  swr?: boolean;
};

export default function useGet<T = any>(url?: string, options?: Opts) {
  const {
    onMount = true,
    defaultData,
    query,
    swr,
  } = options ?? {};
  const [data, setData] = useState<T | null>(defaultData ?? null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {
    data: swrData,
    mutate,
    isLoading,
    error: swrError,
  } = useSWR(
    url,
    () => {
      if (!onMount || !swr) return;

        return get();
      
    },
    { revalidateOnFocus: onMount, revalidateOnMount: onMount },
  );

  const fetchApi = http;

  async function get() {
    setLoading(true);
    setError(null);
    if (!url) return;
    try {
      const response = await fetchApi.get(url, { params: query });
      const data =
      (response as any)?.body?.data ?? response.data?.data ?? response.data?.content;
      setData(data);
      return data;
    } catch (error: any) {
      const err = getResError(error);
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    if (onMount) get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data: swr ? (swrData as T) : data,
    mutate,
    loading: swr ? isLoading : loading,
    error: swr ? swrError : error,
    get,
    setData,
  };
}