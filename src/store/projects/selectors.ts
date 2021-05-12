import { createSelector } from 'reselect';

const projectsList = (state: any) => state.projects;

export const getProjectsList = createSelector(projectsList, (state) => state);
