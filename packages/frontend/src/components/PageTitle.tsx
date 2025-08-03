import type { ReactNode } from 'react';
import './pageTitle.css';

type PageTitleProps = {
  title: string;
  children?: ReactNode;
};

export function PageTitle({ title, children }: PageTitleProps) {
  return (
    <div className="page-title">
      <h1>{title}</h1> {children}
      <div className="punch-line"></div>
    </div>
  );
}
