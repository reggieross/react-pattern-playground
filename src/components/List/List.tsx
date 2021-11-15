import React, { useState } from 'react';
// @ts-ignore
import { TextInput } from '../TextInput/TextInput';
import { MockService } from '../../service/MockService';
import { useSelector } from 'react-redux';
import { AppState } from '../../rootReducer';

export const List: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [data, setData] = useState<Record<string, any>>({});
  const creds = useSelector(
    (state: AppState) => state.data.user.credentials
  ) ?? {
    idToken: '',
    accessToken: '',
    refreshToken: '',
  };

  React.useEffect(() => {
    MockService.searchUsers({ creds, query }).then(res => setData(res));
  }, [query]);
  return (
    <div>
      <TextInput onChange={setQuery} label={'Test'} />
      {data?.data ? JSON.stringify(data?.data) : null}
    </div>
  );
};
