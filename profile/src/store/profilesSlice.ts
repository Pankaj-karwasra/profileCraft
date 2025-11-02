import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Profile, DraftProfile } from '../types';
import uuid from 'react-uuid';

interface ProfilesState {
  profiles: Profile[];
  draftProfile: DraftProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfilesState = {
  profiles: [],
  draftProfile: null,
  isLoading: false,
  error: null,
};

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setDraftBasicInfo: (
      state,
      action: PayloadAction<{ fullName: string; email: string; age: number | ''; avatar?: string }>
    ) => {
      if (!state.draftProfile) {
        state.draftProfile = {
          fullName: '',
          email: '',
          age: '',
          city: '',
          state: '',
          country: '',
          avatar: undefined,
        };
      }
      state.draftProfile.fullName = action.payload.fullName;
      state.draftProfile.email = action.payload.email;
      state.draftProfile.age = action.payload.age;
      state.draftProfile.avatar = action.payload.avatar;
    },
    setDraftAddressInfo: (state, action: PayloadAction<{ city: string; state: string; country: string }>) => {
      if (state.draftProfile) {
        state.draftProfile.city = action.payload.city;
        state.draftProfile.state = action.payload.state;
        state.draftProfile.country = action.payload.country;
      }
    },
    loadProfileIntoDraft: (state, action: PayloadAction<Profile>) => {
      state.draftProfile = { ...action.payload };
    },
    clearDraft: (state) => {
      state.draftProfile = null;
    },
    addProfileStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addProfileSuccess: (state) => {
      if (state.draftProfile) {
        const newProfile: Profile = {
          id: state.draftProfile.id || uuid(),
          fullName: state.draftProfile.fullName,
          email: state.draftProfile.email,
          age: Number(state.draftProfile.age),
          city: state.draftProfile.city,
          state: state.draftProfile.state,
          country: state.draftProfile.country,
          avatar: state.draftProfile.avatar,
        };
        if (newProfile.id && state.profiles.some((p) => p.id === newProfile.id)) {
          state.profiles = state.profiles.map((p) => (p.id === newProfile.id ? newProfile : p));
        } else {
          state.profiles.push(newProfile);
        }
      }
      state.draftProfile = null;
      state.isLoading = false;
    },
    addProfileFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteProfileStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteProfileSuccess: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter((profile) => profile.id !== action.payload);
      state.isLoading = false;
    },
    deleteProfileFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setDraftBasicInfo,
  setDraftAddressInfo,
  loadProfileIntoDraft,
  clearDraft,
  addProfileStart,
  addProfileSuccess,
  addProfileFailure,
  deleteProfileStart,
  deleteProfileSuccess,
  deleteProfileFailure,
} = profilesSlice.actions;

export default profilesSlice.reducer;
