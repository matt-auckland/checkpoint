import React, { createContext, useContext, useState } from 'react';

const PageTitleContext = createContext<{
  title: string;
  setTitle: (title: string) => void;
} | null>(null);

export const PageTitleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [title, setTitle] = useState('');
  return (
    <PageTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};

export const usePageTitle = () => {
  const context = useContext(PageTitleContext);
  if (!context)
    throw new Error('usePageTitle must be used within PageTitleProvider');
  return context;
};
