// Define the Customer type
export type CustomerType = {
  _id?: string | null;
  personName: string;
  email: string;
  phone: string;
};

export type PropertyType = {
  _id?: string | null;
  operatorName: string;
  propertyName: string;
  resortName: string;
  mysqlId: number;
  pageTitle: string;
  countryId: number;
  countryName: string;
  resortId: number;
  operatorId: number;
  refUrl: string;
  beds: number;
  board: string;
  hotTub: boolean;
  mapped: true;
  mapToCountryName: string;
  mapToResortName: string;
  mapToPropertyName: string;
  distanceToCentre: string;
  privateBus: boolean;
  chaletGrade: string;
  childcare: boolean;
  singleRoom: boolean;
  distanceToLift: string;
  distanceToPiste: string;
  allNotEnsuite: boolean;
  recommended: boolean;
  stars: number;
  adultsOnly: boolean;
  openFire: boolean;
  skiInSkiOut: boolean;
  sauna: boolean;
  allEnsuite: boolean;
  steamRoom: boolean;
  shortBreaks: boolean;
  privateChauffeur: boolean;
  pool: boolean;
  inResortDriver: boolean;
  sharedDriver: boolean;
  inHouseCreche: boolean;
  wifi: boolean;
  localPassInc: boolean;
  corporate: boolean;
  imageURL: string;
  nearlySkiInSkiOut: boolean;
};

export type QuoteOptionFlightType = {
  departureDate: Date | null;
  departureAirport: string | null;
  departureDTime: string | null;
  departureATime: string | null;
  returnDate: Date | null;
  returnAirport: string | null;
  returnDTime: string | null;
  returnATime: string | null;
};

export type QuoteOptionType = {
  quoteRef: string | null;
  operatorName: string | null;
  resortName: string | null;
  propertyName: string | null;
  propertyUrl: string | null;
  boardBasis: string | null;
  duration: number | null;
  roomTypes: string[];
  adults: number;
  children: number;
  infants: number;
  totalPrice: number | null;
  optionExpiryDate: Date | null;
  transferIncluded: boolean;
  notes: string | null;
  departureDate: Date | null;
  booked: boolean;
  showNotes: boolean;
  flightOptions: QuoteOptionFlightType[];
  independentTravel: boolean;
};

export type QuoteType = {
  _id?: string | null;
  personName: string;
  email: string;
  phone: string | null;
  created: Date | null;
  creatorId: string | null;
  creatorName: string | null;
  creatorPhone: string | null;
  creatorEmail: string | null;
  quoteOptions: QuoteOptionType[];
  amountMax: number | null;
  amountMin: number | null;
  amountBooked: number | null;
  cancelReason: string | null;
  lastDepartureDate: Date | null;
  lastOptionExpiryDate: Date | null;
  lastUpdatedDate: Date | null;
  includedDocs: string[];
  status: string | null;
  active: boolean;
};

export type PDFOptionType = {
  fileName: string;
  name: string;
  description: string;
};

export type AirportType = {
  shortCode: string;
  name: string;
  created: Date;
};
