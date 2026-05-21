'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/features/auth/schema';
import { z } from 'zod';
import { register } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

export default function RegisterPage(){ const [show,setShow]=useState(false); const {register:rfh,handleSubmit,formState:{errors,isSubmitting}}=useForm<z.infer<typeof registerSchema>>({resolver:zodResolver(registerSchema)}); const onSubmit=async(v:z.infer<typeof registerSchema>)=>{try{await register(v);toast.success('Account created. Verify your email.');}catch(e){toast.error('Registration failed');}}; return <main className='max-w-md mx-auto p-6 space-y-3'><h1 className='text-2xl font-bold'>Create account</h1><form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>{['firstName','lastName','email','phoneNumber'].map((f)=><input key={f} placeholder={f} {...rfh(f as any)} className='w-full border p-2 rounded'/>) }<div><input type={show?'text':'password'} placeholder='password' {...rfh('password')} className='w-full border p-2 rounded'/><button type='button' onClick={()=>setShow(!show)} className='text-xs'>Show/Hide</button></div>{Object.values(errors)[0]?.message && <p className='text-red-500 text-sm'>Invalid input</p>}<Button disabled={isSubmitting}>Register</Button></form></main>; }
