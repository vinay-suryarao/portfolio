import { isAdmin } from '@/lib/adminAuth';

export async function GET() {
  const authenticated = process.env.ADMIN_PASSWORD ? await isAdmin() : false;
  return Response.json({ authenticated });
}
