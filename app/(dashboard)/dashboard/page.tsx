'use client';
import { Sidebar } from '@/components/layout/sidebar';
import { motion } from 'framer-motion';
export default function Dashboard(){return <div className='md:flex'><Sidebar/><main className='p-6 w-full'><motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} className='grid grid-cols-1 md:grid-cols-3 gap-4'>{['Revenue','$12,400'],['New Users','293'],['Messages','1,204'].map(([a,b])=><div key={a} className='p-4 border rounded-xl'><p className='text-sm'>{a}</p><p className='text-2xl font-bold'>{b}</p></div>)}</motion.div></main></div>;}
