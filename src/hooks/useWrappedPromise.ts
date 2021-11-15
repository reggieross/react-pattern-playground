import { useAsyncError } from './useAsyncError';
export function useWrappedPromise<T>(
  func: (...args: any[]) => Promise<T>
): {
  func: (...args: any[]) => { read: () => T | undefined };
} {
  const throwError = useAsyncError();
  const onError = (e: any) => throwError(e);
  const wrappedFunc = (...args: any[]) => {
    return wrapPromise(func(args), onError);
  };

  return { func: wrappedFunc };
}

const wrapPromise = <T>(
  promise: Promise<T>,
  onError?: (error: any) => void
): { read: () => T | undefined } => {
  let status = 'pending';
  let response: T;

  const suspender = promise.then(
    res => {
      status = 'success';
      response = res;
    },
    err => {
      status = 'error';
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender;
      case 'error':
        if (onError) {
          onError(response);
          break;
        } else {
          throw response;
        }
      default:
        return response;
    }
  };

  return { read };
};
