import { useSelector } from 'react-redux';
import { useWrappedPromise } from './useWrappedPromise';
import { AppState } from '../rootReducer';
export function useCallServiceWithCreds<T>(
  func: (...args: any[]) => Promise<T>
): {
  func: (...args: any[]) => { read: () => T | undefined };
} {
  const creds = useSelector((state: AppState) => state.data.user.credentials);
  const { func: getListResources } = useWrappedPromise<T>(func);

  const wrappedFunc = (...args: any[]) => {
    return getListResources(creds, ...args);
  };

  return { func: wrappedFunc };
}
