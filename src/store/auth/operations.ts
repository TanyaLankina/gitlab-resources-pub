import { GITLAB_API_APP_ID, GITLAB_API_APP_SECRET, GITLAB_REDIRECT_URL } from '../../constants';
import { Dispatch } from 'redux';
import { fetchApiRequest } from 'services/apiService';
import { fetchingFinish, fetchingStart, setAuthToken, removeAuthToken } from './authSlice';

interface AuthResponse {
  data: {
    access_token: string;
  };
}
export const fetchAuthToken = (code: string) => async (dispatch: Dispatch) => {
  dispatch(fetchingStart());

  try {
    const { data } = await fetchApiRequest<AuthResponse>('post', `oauth/token`, {
      payload: {
        client_id: GITLAB_API_APP_ID,
        client_secret: GITLAB_API_APP_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: GITLAB_REDIRECT_URL,
      },
    });
    dispatch(setAuthToken({ access_token: data.access_token }));
  } catch (error) {}

  dispatch(fetchingFinish());
};

export const logout = () => (dispatch: Dispatch) => {
  dispatch(removeAuthToken());
};
