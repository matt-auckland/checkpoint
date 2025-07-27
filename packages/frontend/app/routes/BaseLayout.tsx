import { Outlet, useMatches } from 'react-router';

import './BaseLayout.css';
import { SiteHeader } from '~/components/SiteHeader';
import { AuthProvider } from '~/context/AuthContext';

export default function BaseLayout() {
  const matches = useMatches();
  const current = matches[matches.length - 1];
  const title = current.handle?.pageTitle || 'Untitled Page';
  return (
    <AuthProvider>
      <SiteHeader />
      <main>
        <div className="page-title">
          <h1>{title}</h1>
          <div className="punch-line"></div>
        </div>
        <Outlet />
      </main>
    </AuthProvider>
  );
}
