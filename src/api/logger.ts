type LoggerEvent = {
  url: string,
  type: 'error',
  payload: string
}

// logs events params: type, url, payload
export const log = (payload: LoggerEvent): void => {
  console.log(`--> Logger: ${JSON.stringify(payload)}`);
};