import React, { createContext, useReducer, useState } from 'react';
import { TCategory, TPOI } from '../types/types';
import { Condition } from '../components/table/conditionFilter/ConditionFilter';
import { SortingRule } from '../utils/sortingUtils';
import { allCategories } from '../utils/creationUtils';

// START FILTER REDUCER
type TSetSelectedFields = {
  type: 'SET_SELECTED_FIELDS';
  payload: (keyof TPOI)[];
};

type TSetConditions = {
  type: 'SET_CONDITIONS';
  payload: Condition[];
};

type TSetSortings = {
  type: 'SET_SORTINGS';
  payload: SortingRule[];
};

export type TFilterAction = TSetSelectedFields | TSetConditions | TSetSortings;

export type TFilterState = {
  conditions: Condition[];
  sortings: SortingRule[];
  selectedFields: (keyof TPOI)[];
};

const initialFilterState: TFilterState = {
  conditions: [],
  sortings: [],
  selectedFields: ['category', 'name']
};

const filterReducer = (state: TFilterState, action: TFilterAction) => {
  switch (action.type) {
    case 'SET_SELECTED_FIELDS':
      return {
        ...state,
        selectedFields: action.payload
      };
    case 'SET_CONDITIONS':
      return {
        ...state,
        conditions: action.payload
      };
    case 'SET_SORTINGS':
      return {
        ...state,
        sortings: action.payload
      };
    default:
      return state;
  }
};
// END FILTER REDUCER

type Props = {
  children: React.ReactNode;
};

type TCreationContext = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  categories: TCategory[];
  setCategories: React.Dispatch<React.SetStateAction<TCategory[]>>;
  filters: TFilterState;
  dispatch: React.Dispatch<TFilterAction>;
};

const CreationContext = createContext<TCreationContext>({
  title: '',
  setTitle: () => '',
  description: '',
  setDescription: () => '',
  categories: allCategories,
  setCategories: () => [],
  filters: initialFilterState,
  dispatch: () => []
});

const CreationContextProvider = ({ children }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<TCategory[]>(allCategories);
  const [filters, dispatch] = useReducer(filterReducer, initialFilterState);

  const values: TCreationContext = {
    title,
    setTitle,
    description,
    setDescription,
    categories,
    setCategories,
    filters,
    dispatch
  };

  return <CreationContext.Provider value={values}>{children}</CreationContext.Provider>;
};

export { CreationContext, CreationContextProvider };
