import * as React from 'react';
import LoginForm from '@/components/LoginForm';

export interface IPageProps {
}

export default function Page (props: IPageProps) {
  return (
    <div>
        <LoginForm/>
      
    </div>
  );
}
