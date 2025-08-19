import React from 'react';
import { Card as AntCard } from 'antd';

export interface CardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  bordered?: boolean;
  size?: 'default' | 'small';
  type?: 'inner';
  loading?: boolean;
  hoverable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const CardComponent: React.FC<CardProps> = (props) => {
  const { children, ...restProps } = props;
  
  return (
    <AntCard {...restProps}>
      {children}
    </AntCard>
  );
};

export const Card = CardComponent;

export default Card;
