import { useState } from 'react';
// @ts-ignore
import { Subscription } from 'rxjs/dist/types';
import { useSelector } from 'react-redux';
import { AppState } from '../rootReducer';
import {
  createPromiseObservable,
  ServiceObserver,
} from './useSubscribedObserver';

export default function useServiceObserverWithCreds<T>(
  func: (...args: any[]) => Promise<T>
): {
  func: (...args: any[]) => void;
  observedDataState: ServiceObserver<{ loading: boolean; data: T }> | undefined;
} {
  const creds = useSelector(
    (state: AppState) => state.data.user.credentials
  ) ?? {
    idToken: '',
    accessToken: '',
    refreshToken: '',
  };
  const [observedDataState, setData] = useState<
    ServiceObserver<{ loading: boolean; data: T }>
  >();
  const [serviceSubscription, setServiceSubscription] = useState<
    Subscription
  >();

  const createObservable = (...args: any[]) => {
    serviceSubscription?.unsubscribe();
    const subscription = createPromiseObservable<T>(
      func(creds, ...args)
    ).subscribe((res: ServiceObserver<{ loading: boolean; data: T }>) => {
      setData(res);
    });
    setServiceSubscription(subscription);
  };

  return { func: createObservable, observedDataState };
}
