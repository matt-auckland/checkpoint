import { Outlet } from 'react-router-dom';

import './BaseLayout.css';
import { SiteHeader } from '../components/SiteHeader';
import { AuthProvider } from '../context/AuthContext';

export default function BaseLayout() {
  // const matches = useMatches();
  // const current = matches[matches.length - 1];
  return (
    <AuthProvider>
      <SiteHeader />
      <main className="base-layout">
        <Outlet />
      </main>
    </AuthProvider>
  );
}
