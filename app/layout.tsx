import './globals.css';
import { AuthProvider } from '@/hooks/use-auth';
import { Toaster } from 'react-hot-toast';
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang='en'><body><AuthProvider>{children}<Toaster position='top-right'/></AuthProvider></body></html>;}
