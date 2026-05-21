'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/features/auth/schema';
import { z } from 'zod';
import { login } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import Link from 'next/link';
export default function LoginPage(){ const {register,handleSubmit,formState:{isSubmitting}}=useForm<z.infer<typeof loginSchema>>({resolver:zodResolver(loginSchema)}); const onSubmit=async(v:z.infer<typeof loginSchema>)=>{try{await login(v.email,v.password);toast.success('Welcome back');}catch{toast.error('Invalid credentials');}}; return <main className='max-w-md mx-auto p-6 space-y-3'><h1 className='text-2xl font-bold'>Sign in</h1><form onSubmit={handleSubmit(onSubmit)} className='space-y-2'><input placeholder='Email' {...register('email')} className='w-full border p-2 rounded'/><input type='password' placeholder='Password' {...register('password')} className='w-full border p-2 rounded'/><Button disabled={isSubmitting}>Login</Button></form><Link href='/forgot-password'>Forgot password?</Link></main>; }
