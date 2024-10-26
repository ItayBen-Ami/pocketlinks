import { Outlet, useNavigation } from 'react-router-dom';
import TopBar from './TopBar';
import { Suspense } from 'react';

export default function AppLayout() {
  const navigation = useNavigation();

  return (
    <div>
      <TopBar />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          {navigation.state === 'loading' ? <div>Loading content...</div> : <Outlet />}
        </Suspense>
      </main>
    </div>
  );
}
