import { Outlet } from 'react-router-dom';

import './BaseLayout.css';
import { SiteHeader } from '../components/SiteHeader';
import { AuthProvider } from '../context/AuthContext';
import { PageTitle } from '~/components/PageTitle';
import { PageTitleProvider } from '~/context/PageTitleContext';

export default function BaseLayout() {
  return (
    <AuthProvider>
      <PageTitleProvider>
        <SiteHeader />
        <main className="base-layout">
          <PageTitle />
          <Outlet />
        </main>
      </PageTitleProvider>
    </AuthProvider>
  );
}
