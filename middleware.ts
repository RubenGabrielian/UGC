import { NextResponse } from 'next/server';
export function middleware() { return NextResponse.next(); }
export const config = { matcher: [] }; // Անջատել բոլոր match-երը