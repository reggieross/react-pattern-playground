import React, { useState } from 'react';
import { TextInput } from '../TextInput/TextInput';
import { MockService } from '../../service/MockService';
import useServiceObserverWithCreds from '../../hooks/useSubscribedObserverWithCreds';

export const ObservableSearchInput: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const { func: createSearchUsersObservable, observedDataState } = useServiceObserverWithCreds<
    Record<string, any>
  >(MockService.searchUsers);
  React.useEffect(() => {
    createSearchUsersObservable({ query });
  }, [query]);
  return (
    <div>
      <TextInput onChange={setQuery} label={'Test'} />
      {observedDataState?.loading ? `Is Loading: ${query}` : null}
      {observedDataState?.data ? JSON.stringify(observedDataState?.data) : null}
    </div>
  );
};
