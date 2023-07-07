import { TFilterState } from '../context/CreationContext';
import { TAspectRatio, TCategory } from './types';

export type TElement = {
  type: 'map' | 'list' | 'chart';
  aspectRatio: TAspectRatio;
  filters: {
    filters: TFilterState;
    categories: TCategory[];
  };
};
