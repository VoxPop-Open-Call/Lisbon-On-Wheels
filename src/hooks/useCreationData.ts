import { TCreationData } from '../types/creationTypes';
import { useCreationContext, useElementContext } from '../utils/contextHelper';

const useCreationData = (): TCreationData => {
  const { title, description, categories, filters } = useCreationContext();
  const { elements } = useElementContext();
  return {
    title,
    description,
    elements,
    categories,
    filters
  };
};

export { useCreationData };
