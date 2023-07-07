import React, { createContext, useState } from 'react';
import { TElement } from '../types/elementTypes';

type Props = {
  children: React.ReactNode;
};

type TElementContext = {
  elements: TElement[];
  setElements: React.Dispatch<React.SetStateAction<TElement[]>>;
};

const ElementContext = createContext<TElementContext>({
  elements: [],
  setElements: () => []
});

const ElementContextProvider = ({ children }: Props) => {
  const [elements, setElements] = useState<TElement[]>([]);

  const values: TElementContext = {
    elements,
    setElements
  };

  return <ElementContext.Provider value={values}>{children}</ElementContext.Provider>;
};

export { ElementContext, ElementContextProvider };
