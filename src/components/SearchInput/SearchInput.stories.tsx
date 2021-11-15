import { storiesOf } from '@storybook/react';
import React from 'react';
import { SearchInput } from './SearchInput';

storiesOf('Search Input', module).add('Default', () => {
  return <SearchInput />;
});
