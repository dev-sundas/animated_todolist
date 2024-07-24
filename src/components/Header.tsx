import * as React from 'react';
import HeaderItems from '@/components/Headeritems';

export interface IHeaderProps {
}

export default function Header (props: IHeaderProps) {
  return (
    <div>
       <div className='flex gap-5 p-3 w-[90%] m-auto'>
       <HeaderItems link='/signIn' text='SignIn'/>
       <HeaderItems link='/signup' text='SignUp'/>
       <HeaderItems link='/' text='Todo'/>
       </div>
    </div>
  );
}

