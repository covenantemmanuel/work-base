import { cn } from '@/lib/utils';
export function Button({className, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) { return <button className={cn('px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50', className)} {...props} />; }
