'use client';
import Link from 'next/link';
const links=[['/dashboard','Dashboard'],['/profile','Profile'],['/settings','Settings'],['/admin','Admin']];
export function Sidebar(){return <aside className='w-64 p-4 border-r min-h-screen hidden md:block'>{links.map(([href,label])=><Link key={href} href={href} className='block p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800'>{label}</Link>)}</aside>;}
