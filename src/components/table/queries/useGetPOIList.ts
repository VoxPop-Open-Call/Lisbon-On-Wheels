import { HttpClient, TApiError } from '../../../http';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { TPOI } from '../../../types/types';
import { bounds } from '../../../utils/helpers';

function getPOIList(): Promise<TPOI[]> {
  return HttpClient.get('api/poi', { ...bounds, isWheelChairUser: false });
}

export const useGetPOIList = (options?: UseQueryOptions<TPOI[], TApiError>) => {
  return useQuery<TPOI[], TApiError>(['poi'], getPOIList, options);
};
