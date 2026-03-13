export type View = 'dashboard' | 'finder' | 'agent' | 'dataset' | 'docs';
export interface Facility {
  name: string;
  lat: number;
  lng: number;
  state: string;
  lga: string;
  type: string;
  category: string;
  ownership: string;
}
export interface FacilityResult extends Facility {
  distance: number;
}
export interface QueryMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp: string;
}
export interface DatasetInfo {
  name: string;
  apiName: string;
  status: string;
  sources: {
    id: number;
    title: string;
    type: string;
    status: string;
    chunks: number;
  }[];
}