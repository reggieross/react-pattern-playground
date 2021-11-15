import fetch, { Response } from 'node-fetch';

export interface ResponseEntity {
  responseObj: any;
  statusCode: number;
  message?: string;
}

export enum ResponseType {
  JSON = 'json',
  Buffer = 'buffer',
  XML = 'xml',
  none = 'none',
}

const post = async (
  url: string,
  body: Record<string, any>,
  headers?: { [key: string]: string },
  responseType: ResponseType = ResponseType.JSON,
  customHeader?: boolean
): Promise<ResponseEntity> => {
  const fetchHeaders = customHeader
    ? headers
    : { 'Content-Type': 'application/json', ...headers };

  //Note: informational logs NO PII included
  console.info(`Initiating Request to: ${url}`);
  console.info(`Headers included:`, fetchHeaders);
  return fetch(url, {
    method: 'POST',
    headers: fetchHeaders,
    body: JSON.stringify(body),
  }).then(
    async (response: Response) => await handleResponse(response, responseType)
  );
};

const put = async (
  url: string,
  body: Record<string, any>,
  headers?: { [key: string]: string },
  responseType: ResponseType = ResponseType.JSON,
  customHeader?: boolean
): Promise<ResponseEntity> => {
  console.log('BODY', body);
  const fetchHeaders = customHeader
    ? headers
    : { 'Content-Type': 'application/json', ...headers };

  //Note: informational logs NO PII included
  console.info(`Initiating Request to: ${url}`);
  console.info(`Headers included:`, fetchHeaders);
  return fetch(url, {
    method: 'PUT',
    headers: fetchHeaders,
    body: JSON.stringify(body),
  }).then(
    async (response: Response) => await handleResponse(response, responseType)
  );
};

const patch = async (
  url: string,
  body: Record<string, any>,
  headers?: { [key: string]: string },
  responseType: ResponseType = ResponseType.JSON,
  customHeader?: boolean
): Promise<ResponseEntity> => {
  console.log('BODY', body);
  const fetchHeaders = customHeader
    ? headers
    : { 'Content-Type': 'application/json', ...headers };

  //Note: informational logs NO PII included
  console.info(`Initiating Request to: ${url}`);
  console.info(`Headers included:`, fetchHeaders);
  return fetch(url, {
    method: 'PATCH',
    headers: fetchHeaders,
    body: JSON.stringify(body),
  }).then(
    async (response: Response) => await handleResponse(response, responseType)
  );
};

const deleteFunc = async (
  url: string,
  body: Record<string, any> | string,
  headers?: { [key: string]: string },
  responseType: ResponseType = ResponseType.JSON
): Promise<ResponseEntity> => {
  const fetchHeaders = { 'Content-Type': 'application/json', ...headers };
  //Note: informational logs NO PII included
  console.info(`Initiating Request to: ${url}`);
  console.info(`Headers included:`, fetchHeaders);
  return fetch(url, {
    method: 'DELETE',
    headers: fetchHeaders,
    body: JSON.stringify(body),
  }).then(
    async (response: Response) => await handleResponse(response, responseType)
  );
};

const get = (
  url: string,
  responseType: ResponseType,
  headers?: Record<string, any>
): Promise<ResponseEntity> => {
  //Note: informational logs NO PII included
  console.info(`Initiating Request to: ${url}`);
  console.info(`Headers included:`, headers);
  return fetch(url, {
    headers,
  }).then(
    async (response: Response) => await handleResponse(response, responseType)
  );
};

const handleResponse = async (
  response: Response,
  responseType: ResponseType
): Promise<ResponseEntity> => {
  let responseObj: any;
  if (response.ok) {
    switch (responseType) {
      case ResponseType.JSON:
        responseObj = await response.json();
        break;
      case ResponseType.Buffer:
        responseObj = await response.arrayBuffer();
        break;
      case ResponseType.XML:
        responseObj = await response.text();
        break;
      default:
        responseObj = await response.body;
    }

    return {
      responseObj,
      statusCode: response.status,
    };
  } else {
    console.error(`Request wasn't completed:`, response);
    throw new Error(`${response.status}`);
  }
};

export const HttpClient = {
  get,
  post,
  put,
  delete: deleteFunc,
};
