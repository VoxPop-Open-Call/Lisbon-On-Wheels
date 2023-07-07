export type THttpMetadataPagingResponse = {
    count: number;
    skip: number;
    totalCount: number;
  };
  
  export enum THttpSortDirection {
    Ascending = 'ASC',
    Descending = 'DESC',
  }
  
  export type THttpPagedResponse<T> = {
    data: T[];
    meta: THttpMetadataPagingResponse;
  };
  
  export type THttpMetadataQuery = {
    search?: string;
    skip?: number;
    sortBy?: string;
    sortDirection?: THttpSortDirection;
    take?: number;
  };
  
  export type TFillMetadataQueryFunction = (partialQuery: THttpMetadataQuery) => void;