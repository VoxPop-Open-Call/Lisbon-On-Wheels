export type TAspectRatio = { ratio: '1/6' |'1/4' | '1/3' | '1/2' | '1/1'; dimensions: { width: string; height: string } };

export type TCategoryMap = { name: TCategory; value: string, color: string };

export type TCategory =
  | 'UNMEASURED'
  | 'PARKING'
  | 'CAFE'
  | 'RESTAURANT'
  | 'SHOP'
  | 'TOILET'
  | 'PHARMACY'
  | 'HOSPITAL'
  | 'SIGHT'
  | 'AMUSEMENT'
  | 'HOTEL'
  | 'GENERAL_SERVICE'
  | 'BANK'
  | 'PETROL_STATION'
  | 'MEDICAL'
  | 'TRAIN_STATION'
  | 'REST_POINT'
  | 'PUBLIC_TRANSPORT'
  | 'BUSINESS'
  | 'REPAIR'
  | 'CHANGING_PLACE'
  | 'OBSTACLE'
  | 'VIEW_POINT'
  | 'ROLL_ROUTES';

export type TPOI = {
  changeset: number;
  version: number;
  id: string;
  category: TCategory;
  name: string;
  street: string;
  number: string;
  postalCode: string;
  city: string;
  country: string;
  location: {
    latitude: number;
    longitude: number;
  };
  locationEmail: string;
  website: string;
  comments: string;
  doorWidth: number;
  numSteps: number;
  hasRamp: boolean;
  hasTurnpoint: boolean;
  atmHeight: number;
  counterHeight: number;
  adaptedToiletAccessibility: 'UNKNOWN' | 'NONE' | 'GROUND_FLOOR' | 'LIFT_ACCESSIBLE' | 'STAIRS_ACCESSIBLE';
  adaptedToiletDoorWidth: number;
  adaptedToiletSpaceFront: number;
  adaptedToiletSpaceSide: number;
  adaptedToiletNarrowestPointFromEntrance: number;
  hasPaidToilet: boolean;
  hasBabyChangingTable: boolean;
  liftWidth: number;
  liftDepth: number;
  hasDisabledParkingSpaces: boolean;
  parkingSpaces: number;
  parkingLength: number;
  parkingWidth: number;
  parkingAngle: 'UNKNOWN' | 'PARALLEL' | 'PERPENDICULAR' | 'DIAGONAL';
  surface: 'UNKNOWN' | 'ASPHALT' | 'CONCRETE' | 'GRAVEL' | 'COBBLESTONES' | 'GRASS' | 'SAND' | 'DIRT' | 'PAVING_STONES';
  submittedBy: string;
  isUnmeasurable: boolean;
  unmeasurableReasonOther: string;
  openingHours: string;
  kerbHeight: number;
  routeReference: string;
  slope: string;
  tactilePaving: boolean;
  wheelchairAccessible: boolean;
  foodType: 'AFRICAN' | 'ASIAN' | 'MEDITERRANEAN' | 'MIDDLE_EASTERN' | 'WESTERN' | 'BAKERY' | 'FRITURE' | 'DESSERT';
  braille: boolean;
  hearingLoop: boolean;
  numAccessiblePlaces: number;
};
