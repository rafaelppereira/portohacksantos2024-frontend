/* eslint-disable prettier/prettier */
export interface ArrivalNotice {
  eta: string;
  IMO: number;
  RAP: string;
  scaleType: string;
  shipName: string;
}

export interface Forecast {
  RAP: string;
  IMO: number;
  local: string;
  eta: string;
  scaleType: string;
}
export interface InfosCardProps {
  id: string;
  arrivalNotice: ArrivalNotice;
  forecast: Forecast;
  alterado?: string;
  duv: string;
  delay: string
}
