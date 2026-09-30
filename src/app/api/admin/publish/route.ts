import { isAdmin, unauthorized } from '@/lib/adminAuth';
import { getGitHubConfig, writeRepoFile } from '@/lib/github';
import { CONTENT_FILE_PATH } from '@/data/portfolio';

const REQUIRED_KEYS = {
  seo: 'object',
  personal: 'object',
  stats: 'array',
  skillCategories: 'array',
  experience: 'array',
  education: 'array',
  projects: 'array',
  certifications: 'array',
  awards: 'array',
  gallery: 'array',
} as const;

function validate(content: unknown): string | null {
  if (!content || typeof content !== 'object') return 'Content must be an object';
  const record = content as Record<string, unknown>;
  for (const [key, type] of Object.entries(REQUIRED_KEYS)) {
    const value = record[key];
    const ok = type === 'array' ? Array.isArray(value) : !!value && typeof value === 'object';
    if (!ok) return `"${key}" is missing or invalid`;
  }
  return null;
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return unauthorized();

  const github = getGitHubConfig();
  if (!github) {
    return Response.json(
      { error: 'GitHub is not configured. Set GITHUB_TOKEN and GITHUB_REPO in your environment.' },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => null);
  const error = validate(body?.content);
  if (error) return Response.json({ error }, { status: 400 });

  const message =
    typeof body.message === 'string' && body.message.trim()
      ? body.message.trim()
      : 'Update portfolio content from admin panel';

  try {
    const text = JSON.stringify(body.content, null, 2) + '\n';
    const { commitUrl } = await writeRepoFile(github, CONTENT_FILE_PATH, text, message);
    return Response.json({ ok: true, commitUrl });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 502 });
  }
}
