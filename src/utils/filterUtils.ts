import { Dispatch } from 'react';
import { Condition } from '../components/table/conditionFilter/ConditionFilter';
import { TCategory, TPOI } from '../types/types';
import { TFilterAction } from '../context/CreationContext';
import { enumSelectObject } from '../components/table/enumData';
import { SortingRule, sortPois } from './sortingUtils';

const clearFilters = (
  setPoiList: React.Dispatch<React.SetStateAction<TPOI[]>>,
  untouchedPoiList: TPOI[],
  dispatch: Dispatch<TFilterAction>,
  categories: TCategory[],
  setAreFiltersApplied: React.Dispatch<React.SetStateAction<boolean>>
) => {
  dispatch({ type: 'SET_CONDITIONS', payload: [] });
  dispatch({ type: 'SET_SORTINGS', payload: [] });
  const filteredByCategories = untouchedPoiList.filter((poi) => categories.includes(poi.category));
  setPoiList(filteredByCategories);
  setAreFiltersApplied(false);
};

const applyConditions = (data: TPOI[], conditions: Condition[], categories: TCategory[]): TPOI[] => {
  return data.filter((item) => {
    if (!categories.includes(item.category)) {
      return false;
    }
    return conditions.every((condition) => {
      const { field, operator, operands } = condition;
      const value = item[field];
      if (POITypeMap[field] === POIPropertyType.NUMBER) {
        switch (operator) {
          case '<':
            return value < operands[0];
          case '=':
            return value === operands[0];
          case '>':
            return value > operands[0];
          case '>=':
            return value >= operands[0];
          case '<=':
            return value <= operands[0];
          default:
            return false;
        }
      }
      if (POITypeMap[field] === POIPropertyType.STRING) {
        if (operator === 'in' && typeof value === 'string') {
          const stringToCheck = operands[0] as string;
          return value.toLowerCase().includes(stringToCheck.toLowerCase());
        }
        if (operator === 'not in' && typeof value === 'string') {
          const stringToCheck = operands[0] as string;
          return !value.toLowerCase().includes(stringToCheck.toLowerCase());
        }
        if (operands[0] === '') {
          return true;
        }
        return value === operands[0];
      }

      if (POITypeMap[field] === POIPropertyType.BOOLEAN) {
        return value === operands[0];
      }
      if (POITypeMap[field] === POIPropertyType.ENUM) {
        return operands.some((operand) => operand === value);
      }
      if (POITypeMap[field] === POIPropertyType.LOCATION) {
        return true;
      }
      return false;
    });
  });
};

const applyAllFilters = (
  poiList: TPOI[],
  categories: TCategory[],
  conditions: Condition[],
  sortings: SortingRule[],
  setPoiList: React.Dispatch<React.SetStateAction<TPOI[]>>,
  setAreFiltersApplied?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const dataWithConditionsApplied = applyConditions(poiList, conditions, categories);
  const sortedData = sortPois(dataWithConditionsApplied, sortings);
  setPoiList(sortedData);
  setAreFiltersApplied?.(true);
};

const getInitialEnumValue = (field: keyof TPOI): string => {
  const array = enumSelectObject[field];
  if (array) return array[0];
  return '';
};

const getInitialConditionValue = (field: keyof TPOI) => {
  switch (POITypeMap[field]) {
    case POIPropertyType.NUMBER:
      return 0;
    case POIPropertyType.STRING:
      return '';
    case POIPropertyType.ENUM:
      return getInitialEnumValue(field);
    case POIPropertyType.BOOLEAN:
      return true;
    default:
      return 0;
  }
};

enum POIPropertyType {
  STRING = 'string',
  NUMBER = 'number',
  ENUM = 'enum',
  LOCATION = 'location',
  BOOLEAN = 'boolean'
}

const POITypeMap: Record<keyof TPOI, POIPropertyType> = {
  changeset: POIPropertyType.NUMBER,
  version: POIPropertyType.NUMBER,
  id: POIPropertyType.STRING,
  category: POIPropertyType.ENUM,
  name: POIPropertyType.STRING,
  street: POIPropertyType.STRING,
  number: POIPropertyType.STRING,
  postalCode: POIPropertyType.STRING,
  city: POIPropertyType.STRING,
  country: POIPropertyType.STRING,
  location: POIPropertyType.LOCATION,
  locationEmail: POIPropertyType.STRING,
  website: POIPropertyType.STRING,
  comments: POIPropertyType.STRING,
  doorWidth: POIPropertyType.NUMBER,
  numSteps: POIPropertyType.NUMBER,
  hasRamp: POIPropertyType.BOOLEAN,
  hasTurnpoint: POIPropertyType.BOOLEAN,
  atmHeight: POIPropertyType.NUMBER,
  counterHeight: POIPropertyType.NUMBER,
  adaptedToiletAccessibility: POIPropertyType.ENUM,
  adaptedToiletDoorWidth: POIPropertyType.NUMBER,
  adaptedToiletSpaceFront: POIPropertyType.NUMBER,
  adaptedToiletSpaceSide: POIPropertyType.NUMBER,
  adaptedToiletNarrowestPointFromEntrance: POIPropertyType.NUMBER,
  hasPaidToilet: POIPropertyType.BOOLEAN,
  hasBabyChangingTable: POIPropertyType.BOOLEAN,
  liftWidth: POIPropertyType.NUMBER,
  liftDepth: POIPropertyType.NUMBER,
  hasDisabledParkingSpaces: POIPropertyType.BOOLEAN,
  parkingSpaces: POIPropertyType.NUMBER,
  parkingLength: POIPropertyType.NUMBER,
  parkingWidth: POIPropertyType.NUMBER,
  parkingAngle: POIPropertyType.ENUM,
  surface: POIPropertyType.ENUM,
  submittedBy: POIPropertyType.STRING,
  isUnmeasurable: POIPropertyType.BOOLEAN,
  unmeasurableReasonOther: POIPropertyType.STRING,
  openingHours: POIPropertyType.STRING,
  kerbHeight: POIPropertyType.NUMBER,
  routeReference: POIPropertyType.STRING,
  slope: POIPropertyType.STRING,
  tactilePaving: POIPropertyType.BOOLEAN,
  wheelchairAccessible: POIPropertyType.BOOLEAN,
  foodType: POIPropertyType.ENUM,
  braille: POIPropertyType.BOOLEAN,
  hearingLoop: POIPropertyType.BOOLEAN,
  numAccessiblePlaces: POIPropertyType.NUMBER
};

export { applyConditions, clearFilters, POITypeMap, POIPropertyType, getInitialConditionValue, applyAllFilters };
