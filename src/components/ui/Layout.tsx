import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import { useUser } from '../../contexts/UserContext';
import EntryPage from '../../pages/EntryPage';

export default function AppLayout() {
  const { isLoggedIn } = useUser();

  return (
    <div className="flex flex-col">
      <TopBar />
      <main className="flex-1 grow">{isLoggedIn ? <Outlet /> : <EntryPage />}</main>
    </div>
  );
}
