export enum LogLevel {
  INFO = 'INFO',
  ERROR = 'ERROR',
}

const log = (message: string | Error, level = LogLevel.INFO) => {};

export const LoggerService = {
  log,
};
