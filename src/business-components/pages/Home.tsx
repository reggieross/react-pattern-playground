import React from 'react';
import { ErrorBoundary } from '../../errors/ErrorBoundary';
import { SuspendedList } from '../../components/List/SuspenededList';
interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = React.memo(() => {
  return (
    <div>
      <ErrorBoundary>
        <SuspendedList />
      </ErrorBoundary>
    </div>
  );
});
