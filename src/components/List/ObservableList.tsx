import React from 'react';
import { MockService } from '../../service/MockService';
import { Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import useServiceObserverWithCreds from '../../hooks/useSubscribedObserverWithCreds';
import { User } from '../redux-data/users';

export const ObservableList: React.FC = () => {
  const {
    func: createGetUsersObservable,
    observedDataState,
  } = useServiceObserverWithCreds<User[]>(
    MockService.fetchListItems
  );

  React.useEffect(() => {
    createGetUsersObservable();
  }, []);

  const renderList = (props: User[]) => {
    if (!props) {
      return <div />;
    }

    return (
      <Table>
        <TableBody>
          {props.map(record => {
            return (
              <TableRow key={record.id}>
                <TableCell>{record.firstName}</TableCell>
                <TableCell>{record.lastName}</TableCell>
                <TableCell>{record.age}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  return (
    <div>
      {observedDataState && observedDataState?.loading && 'Loading'}
      {observedDataState?.data && renderList(observedDataState?.data as any)}
    </div>
  );
};
