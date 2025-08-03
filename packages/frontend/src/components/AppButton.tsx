import React from 'react';
import './appButton.css';
type AppButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function AppButton(props: AppButtonProps) {
  const { children } = props;
  return (
    <button className="app-button" {...props}>
      {children}
    </button>
  );
}
