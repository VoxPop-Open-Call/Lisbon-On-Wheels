import { TPOI } from '../types/types';

export const sortPois = (pois: TPOI[], sortingRules: SortingRule[]): TPOI[] => {
  const getSortingComparator = (sortingRule: SortingRule) => {
    const { field, sorting } = sortingRule;
    switch (sorting) {
      case ESortingType.ASC:
        return (a: TPOI, b: TPOI) => {
          if (a[field] === undefined) return 1;
          if (b[field] === undefined) return -1;
          return (a[field] as number) - (b[field] as number);
        };
      case ESortingType.DESC:
        return (a: TPOI, b: TPOI) => {
          if (a[field] === undefined) return 1;
          if (b[field] === undefined) return -1;
          return (b[field] as number) - (a[field] as number);
        };
      case ESortingType.AZ:
        return (a: TPOI, b: TPOI) => {
          if (a[field] === undefined) return 1;
          if (b[field] === undefined) return -1;
          return (a[field] as string).localeCompare(b[field] as string, undefined, { numeric: true });
        };
      case ESortingType.ZA:
        return (a: TPOI, b: TPOI) => {
          if (a[field] === undefined) return 1;
          if (b[field] === undefined) return -1;
          return (b[field] as string).localeCompare(a[field] as string, undefined, { numeric: true });
        };
      case ESortingType.NO:
        return (a: TPOI, b: TPOI) => {
          if (a[field] === undefined) return 1;
          if (b[field] === undefined) return -1;
          return Number((a[field] as boolean) === true) - Number((b[field] as boolean) === true);
        };
      case ESortingType.YES:
        return (a: TPOI, b: TPOI) => {
          if (a[field] === undefined) return 1;
          if (b[field] === undefined) return -1;
          return Number((b[field] as boolean) === true) - Number((a[field] as boolean) === true);
        };
      default:
        return () => 0; // No sorting
    }
  };

  const sortingComparators = sortingRules.map(getSortingComparator);

  return pois.sort((a, b) => {
    for (let i = 0; i < sortingComparators.length; i++) {
      const compareResult = sortingComparators[i](a, b);
      if (compareResult !== 0) {
        return compareResult;
      }
    }

    return 0;
  });
};

export enum ESortingType {
  ASC = 'ASC',
  DESC = 'DESC',
  AZ = 'A-Z',
  ZA = 'Z-A',
  YES = 'true',
  NO = 'false'
}

type TSortingType =
  | (ESortingType.ASC | ESortingType.DESC)
  | (ESortingType.AZ | ESortingType.ZA)
  | (ESortingType.YES | ESortingType.NO);

export type SortingRule = {
  field: keyof TPOI;
  sorting: TSortingType;
};
