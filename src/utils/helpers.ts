import { TAspectRatio } from '../types/types';

const aspectRatios: TAspectRatio[] = [
  { ratio: '1/1', dimensions: { height: '100%', width: '100%' } },
  { ratio: '1/2', dimensions: { height: '100%', width: '50%' } },
  { ratio: '1/3', dimensions: { height: '100%', width: '33.33%' } },
  { ratio: '1/4', dimensions: { height: '50%', width: '50%' } },
  { ratio: '1/6', dimensions: { height: '50%', width: '33.33%' } }
];

const bounds = {
  minLongitude: -9.148027,
  minLatitude: 38.70657,
  maxLongitude: -9.129573,
  maxLatitude: 38.717486
};

export { aspectRatios, bounds };
