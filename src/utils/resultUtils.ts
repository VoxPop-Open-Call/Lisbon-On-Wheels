import { TAspectRatio } from '../types/types';

export const mapAspectRatioToGrid = (aspectRatio: TAspectRatio) => {
  switch (aspectRatio.ratio) {
    case '1/6':
      return 2;
    case '1/4':
      return 3;
    case '1/3':
      return 4;
    case '1/2':
      return 6;
    case '1/1':
      return 12;
    default:
      return 12;
  }
};

export const mapAspectRatioToHeight = (aspectRatio: TAspectRatio) => {
  switch (aspectRatio.ratio) {
    case '1/6':
      return '25vh';
    case '1/4':
      return '25vh';
    case '1/3':
      return '50vh';
    case '1/2':
      return '50vh';
    case '1/1':
      return '80vh';
    default:
      return '80vh';
  }
};
