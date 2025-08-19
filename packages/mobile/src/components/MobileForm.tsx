import React, { ReactNode } from 'react';

export interface MobileFormProps {
  children: ReactNode;
  onSubmit?: (data: any) => void;
  className?: string;
}

export const MobileForm: React.FC<MobileFormProps> = ({ 
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
    <form onSubmit={handleSubmit} className={`mobile-form ${className}`}>
      {children}
    </form>
  );
}; 