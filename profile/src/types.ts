export interface Profile {
  id: string;
  fullName: string;
  email: string;
  age: number;
  city: string;
  state: string;
  country: string;
  avatarUrl?: string;
}


export interface DraftProfile {
  id?: string; 
  fullName: string;
  email: string;
  age: number | ''; 
  city: string;
  state: string;
  country: string;
  avatarUrl?: string;
}

export type RootStackParamList = {
  Home: undefined;
  BasicInfo: { profileId?: string } | undefined; 
  AddressInfo: undefined;
  Summary: undefined;
};