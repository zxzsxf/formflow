import React, { ReactNode } from 'react';

export interface PCFormProps {
  children: ReactNode;
  onSubmit?: (data: any) => void;
  className?: string;
}

export const PCForm: React.FC<PCFormProps> = ({ 
  children, 
  onSubmit, 
  className = '' 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`pc-form ${className}`}>
      {children}
    </form>
  );
}; 