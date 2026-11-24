export const webRVersion = '0.6.1';
export const rVersion = '4.6.0';
export const rRepositoryVersion = '4.6';
export const rPackages = ['dplyr', 'tidyr', 'tibble', 'readr', 'stringr', 'lubridate', 'ggplot2', 'purrr', 'forcats',
  'jsonlite', 'slider', 'broom', 'R6', 'zoo', 'DBI', 'RSQLite', 'dbplyr'] as const;
export const rBasePackages = ['R', 'base', 'compiler', 'datasets', 'grDevices', 'graphics', 'grid', 'methods',
  'parallel', 'splines', 'stats', 'stats4', 'tcltk', 'tools', 'translations', 'utils', 'webr'] as const;
export const rEnvironment = {version: `webr@${webRVersion}/r@${rVersion}/comercio@1`,
  runtime: {id: 'webr', version: webRVersion}, packages: []};
