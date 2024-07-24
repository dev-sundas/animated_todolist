import * as React from 'react';
import Link from 'next/link';
import { Playball } from 'next/font/google';
const play = Playball({
  weight: "400",
  subsets: ["latin"],
});

 type Props = {
    link: string,
    text: string
}

export default function HeaderItems ({link,text}: Props) {
  return (
    <div className={`${play.className}
                             text-[#621940] text-[22px] font-semibold hover:underline`}>
        <Link href={link}>{text}</Link>
    </div>
  );
}
