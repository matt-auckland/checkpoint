import './pageTitle.css';
import type { ReactNode } from 'react';
import { usePageTitle } from '~/context/PageTitleContext';

type PageTitleProps = {
  children?: ReactNode;
};

export function PageTitle({ children }: PageTitleProps) {
  const { title } = usePageTitle();

  return (
    <div className="page-title">
      <div>
        {title && <h1>{title}</h1>}
        {children}
      </div>

      <div className="punch-line"></div>
    </div>
  );
}
