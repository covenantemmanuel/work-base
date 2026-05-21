import { NextResponse } from 'next/server';
export async function POST(req: Request){ const {reference} = await req.json(); if(!reference) return NextResponse.json({ok:false},{status:400}); return NextResponse.json({ok:true,status:'verified'}); }
