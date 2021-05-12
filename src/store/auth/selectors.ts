import { createSelector } from 'reselect';

const accessToken = (state: any) => state.auth.authToken;

export const getAccessToken = createSelector(accessToken, (state) => state);