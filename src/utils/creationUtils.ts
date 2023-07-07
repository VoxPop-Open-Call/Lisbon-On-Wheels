import { CATEGORY_MAP } from '../assets/markers/markerSVGs';
import { TCreationData } from '../types/creationTypes';

export const getAllMapConfigs = () => {
  const storedData = localStorage.getItem('mapConfigs');
  let mapConfigs: TCreationData[] = [];

  try {
    if (storedData) {
      mapConfigs = JSON.parse(storedData);
    }
  } catch (error) {
    console.error('Error parsing mapConfigs:', error);
  }

  return mapConfigs || [];
};
export const isTitleUnique = (title: string) => {
  const mapConfigs = getAllMapConfigs();
  const isUnique = !mapConfigs.some((config) => config.title === title);
  if (isUnique) {
    return true;
  } else {
    return false;
  }
};

export const saveMapConfig = (creationData: TCreationData) => {
  const mapConfigs = getAllMapConfigs();
  mapConfigs.push(creationData);
  localStorage.setItem('mapConfigs', JSON.stringify(mapConfigs));
};

export const removeMapConfigByTitle = (title: string) => {
  const mapConfigs = getAllMapConfigs();
  const configsWithoutUnwanted = mapConfigs.filter((config) => config.title !== title);
  localStorage.setItem('mapConfigs', JSON.stringify(configsWithoutUnwanted));
};

export const getMapConfigByTitle = (title: string) => {
  const mapConfigs = getAllMapConfigs();
  const requestedConfig = mapConfigs.find((config) => config.title === title);
  return requestedConfig || null;
};

export const allCategories = CATEGORY_MAP.map((category) => category.name);
