import { storiesOf } from '@storybook/react';
import React from 'react';
import { List } from './List';
import { ObservableList } from './ObservableList';
import { SuspendedList } from './SuspenededList';
import { ErrorBoundary } from '../../errors/ErrorBoundary';

storiesOf('List', module)
  .add('Default', () => {
    return <List />;
  })
  .add('Observable List', () => {
    return <ObservableList />;
  })
  .add('Suspended List', () => {
    return (
      <ErrorBoundary>
        <SuspendedList />
      </ErrorBoundary>
    );
  });
