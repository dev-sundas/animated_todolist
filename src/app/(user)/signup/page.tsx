import RegisterForm from '@/components/RegisterForm';
import * as React from 'react';

export interface IPageProps {
}

export default function Page (props: IPageProps) {
  return (
    <div>
      <RegisterForm/>
    </div>
  );
}
