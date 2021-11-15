import { useState } from 'react';
// @ts-ignore
import { Subscription } from 'rxjs/dist/types';
import { Observable } from 'rxjs';

export interface ServiceObserver<T> {
  loading: boolean;
  data?: T;
  error?: any;
}

export const createPromiseObservable = <T>(promise: Promise<T>) =>
  new Observable<ServiceObserver<{ loading: boolean; data: T }>>(
    (observer: Subscription<ServiceObserver<T>>) => {
      console.info(`started`);
      observer.next({ loading: true });
      promise
        .then(res => {
          observer.next({
            loading: false,
            data: res as T,
          });
          console.info(`ended`);
          observer.complete();
        })
        .catch(error => {
          observer.next({
            loading: false,
            error,
          });
          console.info(`ended`);
          observer.complete();
        });
    }
  );

export default function useServiceObserver<T>(
  func: (...args: any[]) => Promise<T>
): {
  func: (...args: any[]) => void;
  observedDataState: ServiceObserver<{ loading: boolean; data: T }> | undefined;
} {
  const [observedDataState, setData] = useState<
    ServiceObserver<{ loading: boolean; data: T }>
  >();
  const [serviceSubscription, setServiceSubscription] = useState<
    Subscription
  >();

  const createObservable = (...args: any[]) => {
    serviceSubscription?.unsubscribe();
    const subscription = createPromiseObservable<T>(func(...args)).subscribe(
      (res: ServiceObserver<{ loading: boolean; data: T }>) => {
        setData(res);
      }
    );
    setServiceSubscription(subscription);
  };

  return { func: createObservable, observedDataState };
}
