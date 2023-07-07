import { CATEGORY_MAP } from '../assets/markers/markerSVGs';
import { TPOI } from '../types/types';

export const transformPoisToCategoryChartData = (poiList: TPOI[], property: keyof TPOI) => {
  const propertyCountObject = poiList.reduce((countObject, poi) => {
    const propertyValue = poi[property];
    countObject[propertyValue as keyof TPOI] = (countObject[propertyValue as keyof TPOI] || 0) + 1;
    return countObject;
  }, {} as Record<keyof TPOI, number>);

  const totalPOIs = poiList.length;

  const data = Object.entries(propertyCountObject).map(([property, count]) => ({
    name: property,
    value: (count / totalPOIs) * 100,
    fill: CATEGORY_MAP.find((category) => category.name === property)?.color
  }));

  return data;
};
