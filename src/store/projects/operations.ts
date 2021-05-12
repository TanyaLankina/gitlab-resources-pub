import { GITLAB_API_VERSION_URL } from '../../constants';
import { Project } from 'interfaces/Projects';
import { Dispatch } from 'redux';
import { fetchApiRequest } from 'services/apiService';
import { serializeParamsToQueryString } from 'utils/helpers';
import { fetchingFinish, fetchingStart, setProjectsList } from './projectsSlice';

interface ProjectsResponse {
  data: Project[];
  headers: {
    'x-prev-page': number;
    'x-next-page': number;
  };
}
export const getProjects = (per_page?: number | 20, page?: number | 1) => async (
  dispatch: Dispatch
) => {
  dispatch(fetchingStart());

  try {
    const { data: projects, headers } = await fetchApiRequest<ProjectsResponse>(
      'get',
      `${GITLAB_API_VERSION_URL}/projects${serializeParamsToQueryString({
        per_page,
        order_by: 'id',
        sort: 'asc',
        page,
      })}`
    );
    dispatch(
      setProjectsList({
        projects,
        prevPage: headers['x-prev-page'],
        nextPage: headers['x-next-page'],
      })
    );
  } catch {
    dispatch(setProjectsList({}));
  }

  dispatch(fetchingFinish());
};

export const searchProjects = (
  searchTerm: string,
  page?: number | 1,
  per_page?: number | 20
) => async (dispatch: Dispatch) => {
  dispatch(fetchingStart());

  try {
    const { data: projects, headers } = await fetchApiRequest<ProjectsResponse>(
      'get',
      `${GITLAB_API_VERSION_URL}/search${serializeParamsToQueryString({
        per_page,
        order_by: 'id',
        sort: 'asc',
        scope: 'projects',
        search: searchTerm,
        page,
      })}`
    );
    dispatch(
      setProjectsList({
        projects,
        prevPage: headers['x-prev-page'],
        nextPage: headers['x-next-page'],
        isSearchResult: true,
      })
    );
  } catch {
    dispatch(setProjectsList({}));
  }

  dispatch(fetchingFinish());
};
