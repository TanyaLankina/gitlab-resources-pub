export const serializeParamsToQueryString = (params: any): string => {
  const query = Object.keys(params)
    .reduce<string[]>((arrayParams, paramKey) => {
      const paramValue = params[paramKey];

      if (!paramValue) return arrayParams;

      const newParams = Array.isArray(paramValue)
        ? paramValue.reduce<string[]>(
            (newArrayParams, value) => newArrayParams.concat(`[${paramKey}]=${value}`),
            []
          )
        : `${paramKey}=${paramValue}`;

      return arrayParams.concat(newParams);
    }, [])
    .join('&');

  return query ? `?${query}` : '';
};
