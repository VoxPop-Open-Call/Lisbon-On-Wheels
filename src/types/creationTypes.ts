import { TFilterState } from '../context/CreationContext';
import { TElement } from './elementTypes';
import { TCategory } from './types';

export type TCreationData = {
  title: string;
  description: string;
  categories: TCategory[];
  elements: TElement[];
  filters: TFilterState;
};
