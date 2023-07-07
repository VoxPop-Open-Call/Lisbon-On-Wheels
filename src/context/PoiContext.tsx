import React, { createContext, useState } from 'react';
import { TPOI } from '../types/types';
import { useGetPOIList } from '../components/table/queries/useGetPOIList';

type Props = {
  children: React.ReactNode;
};

type TPoiContext = {
  untouchedPoiList: TPOI[];
  setUntouchedPoiList: React.Dispatch<React.SetStateAction<TPOI[]>>;
  poiList: TPOI[];
  setPoiList: React.Dispatch<React.SetStateAction<TPOI[]>>;
  areFiltersApplied: boolean;
  setAreFiltersApplied: React.Dispatch<React.SetStateAction<boolean>>;
};

const PoiContext = createContext<TPoiContext>({
  untouchedPoiList: [],
  setUntouchedPoiList: () => [],
  poiList: [],
  setPoiList: () => [],
  areFiltersApplied: false,
  setAreFiltersApplied: () => false
});

const PoiContextProvider = ({ children }: Props) => {
  const [untouchedPoiList, setUntouchedPoiList] = useState<TPOI[]>([]);
  const [poiList, setPoiList] = useState<TPOI[]>([]);
  const [areFiltersApplied, setAreFiltersApplied] = useState(false);

  useGetPOIList({
    onSuccess: (data) => {
      setUntouchedPoiList(data);
      setPoiList(data);
      setAreFiltersApplied(false);
    }
  });

  const values: TPoiContext = {
    untouchedPoiList,
    setUntouchedPoiList,
    poiList,
    setPoiList,
    areFiltersApplied,
    setAreFiltersApplied
  };

  return <PoiContext.Provider value={values}>{children}</PoiContext.Provider>;
};

export { PoiContext, PoiContextProvider };
