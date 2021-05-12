import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from 'interfaces/Projects';
import type { RootState } from '../store';

interface ProjectState {
  projects: Project[] | null;
  prevPage: number | null;
  nextPage: number | null;
  fetching: boolean;
  isSearchResult: boolean;
}

const initialState: ProjectState = {
  projects: null,
  prevPage: null,
  nextPage: null,
  fetching: false,
  isSearchResult: false,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjectsList: (
      state,
      action: PayloadAction<{
        projects?: Project[] | null;
        prevPage?: number | null;
        nextPage?: number | null;
        isSearchResult?: boolean | false;
      }>
    ) => {
      state.projects = action.payload.projects ?? null;
      state.prevPage = action.payload.prevPage ?? null;
      state.nextPage = action.payload.nextPage ?? null;
      state.isSearchResult = action.payload.isSearchResult ?? false;
    },
    fetchingStart: (state) => {
      state.fetching = true;
    },
    fetchingFinish: (state) => {
      state.fetching = false;
    },
  },
});

export const { setProjectsList, fetchingStart, fetchingFinish } = projectsSlice.actions;

export const selectProjects = (state: RootState) => state.projects;

export default projectsSlice.reducer;
