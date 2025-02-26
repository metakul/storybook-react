import { ReactNode } from 'react';

export interface StatCardProps {
    number: string;
    label: string;
    color: string;
    icon?: ReactNode;
    delay?: number;
  }
  
  export interface CoinDisplayProps {
    animate: boolean;
  }