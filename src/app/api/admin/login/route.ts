import { cookies } from 'next/headers';
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  isPasswordCorrect,
} from '@/lib/adminAuth';

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: '' }));

  if (!process.env.ADMIN_PASSWORD) {
    return Response.json(
      { error: 'ADMIN_PASSWORD is not configured on the server.' },
      { status: 500 },
    );
  }

  if (typeof password !== 'string' || !isPasswordCorrect(password)) {
    // Small delay to slow down password guessing.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return Response.json({ error: 'Wrong password' }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });

  return Response.json({ ok: true });
}
