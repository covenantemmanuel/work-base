'use client';
import { useForm } from 'react-hook-form';
import { forgotSchema } from '@/features/auth/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { forgotPassword } from '@/services/auth.service';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
export default function Forgot(){ const {register,handleSubmit}=useForm<z.infer<typeof forgotSchema>>({resolver:zodResolver(forgotSchema)}); return <main className='max-w-md mx-auto p-6'><form onSubmit={handleSubmit(async (v)=>{await forgotPassword(v.email);toast.success('Reset email sent');})} className='space-y-2'><input {...register('email')} className='w-full border p-2 rounded' placeholder='Email'/><Button>Send reset link</Button></form></main>; }
