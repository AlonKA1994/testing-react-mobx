export enum LogFilter {
    Home = 0,
    CreateLog,
    ViewLog
};

export const LOG_FILTER_TYPES = [
    LogFilter.Home,
    LogFilter.CreateLog,
    LogFilter.ViewLog
];

export const LOG_FILTER_TITLES = {
    [LogFilter.Home]: 'Home',
    [LogFilter.CreateLog]: 'Create new log',
    [LogFilter.ViewLog]: 'View all logs'
};

export const LOG_FILTER_LOCATION_HASH = {
    [LogFilter.Home]: '',
    [LogFilter.CreateLog]: 'new',
    [LogFilter.ViewLog]: 'view',
}
