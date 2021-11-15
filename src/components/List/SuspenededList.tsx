import React, { Suspense } from 'react';
import { MockService } from '../../service/MockService';
import { Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import { useCallServiceWithCreds } from '../../hooks/useCallServiceWithCreds';
import { User } from '../redux-data/users';

export const SuspendedList: React.FC = () => {
  const { func: getListResources } = useCallServiceWithCreds<User[]>(
    MockService.fetchListItems
  );

  const resource = getListResources();
  return (
    <Suspense fallback={'... Suspended Loading'}>
      <InternalList resource={resource} />
    </Suspense>
  );
};

export const InternalList: React.FC<{
  resource: { read: () => User[] | undefined };
}> = ({ resource }) => {
  return (
    <Table>
      <TableBody>
        {resource.read()?.map(record => {
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