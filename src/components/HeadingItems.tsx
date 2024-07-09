import * as React from 'react';
import { motion } from "framer-motion"
import Link from 'next/link';
import { Playball } from 'next/font/google';


const play = Playball({
    weight: "400",
    subsets: ["latin"],
});
type Props = {
    heading1: string
    heading2: string
}

export default function HeadingItems({ heading1, heading2 }: Props) {
    return (
        <div>
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2, delay: 1.5 }} >
                <Link href={"/"}
                    className='font-bold text-[27px] 
                         lg:text-[52px] text-center'>
                    <h1 className={`${play.className}
                             text-[#621940]`}>{heading1}<span
                            className={`${play.className} text-[#0b032d] `}>{heading2}</span>
                    </h1></Link>
            </motion.div>

        </div>
    );
}
