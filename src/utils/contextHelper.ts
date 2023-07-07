import { useContext } from 'react';
import { CreationContext } from '../context/CreationContext';
import { ElementContext } from '../context/ElementContext';
import { PoiContext } from '../context/PoiContext';

export const useCreationContext = () => useContext(CreationContext);

export const useElementContext = () => useContext(ElementContext);

export const usePoiContext = () => useContext(PoiContext);