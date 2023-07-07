import { TPOI } from '../../types/types';

export const enumSelectObject: Partial<Record<keyof TPOI, string[]>> = {
  category: [
    'UNMEASURED',
    'PARKING',
    'CAFE',
    'RESTAURANT',
    'SHOP',
    'TOILET',
    'PHARMACY',
    'HOSPITAL',
    'SIGHT',
    'AMUSEMENT',
    'HOTEL',
    'GENERAL_SERVICE',
    'BANK',
    'PETROL_STATION',
    'MEDICAL',
    'TRAIN_STATION',
    'REST_POINT',
    'PUBLIC_TRANSPORT',
    'BUSINESS',
    'REPAIR',
    'CHANGING_PLACE',
    'OBSTACLE',
    'VIEW_POINT',
    'ROLL_ROUTES'
  ],
  adaptedToiletAccessibility: ['UNKNOWN', 'NONE', 'GROUND_FLOOR', 'LIFT_ACCESSIBLE', 'STAIRS_ACCESSIBLE'],
  parkingAngle: ['UNKNOWN', 'PARALLEL', 'PERPENDICULAR', 'DIAGONAL'],
  surface: ['UNKNOWN', 'ASPHALT', 'CONCRETE', 'GRAVEL', 'COBBLESTONES', 'GRASS', 'SAND', 'DIRT', 'PAVING_STONES'],
  foodType: ['AFRICAN', 'ASIAN', 'MEDITERRANEAN', 'MIDDLE_EASTERN', 'WESTERN', 'BAKERY', 'FRITURE', 'DESSERT']
};
