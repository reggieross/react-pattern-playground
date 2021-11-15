import { storiesOf } from '@storybook/react';
import React from 'react';
import { ObservableSearchInput } from './ObservableSearchInput';

storiesOf('Observable Search Input', module).add('Default', () => {
  return <ObservableSearchInput />;
});
