import { isAdmin, unauthorized } from '@/lib/adminAuth';
import { getGitHubConfig, readRepoFile } from '@/lib/github';
import { CONTENT_FILE_PATH } from '@/data/portfolio';
import localContent from '@/data/content.json';

// Returns the content to edit. Prefers the copy on GitHub so the admin panel
// always starts from what is actually published, even if this deployment is
// a few minutes behind.
export async function GET() {
  if (!(await isAdmin())) return unauthorized();

  const github = getGitHubConfig();
  if (!github) {
    return Response.json({ content: localContent, source: 'local', githubConfigured: false });
  }

  try {
    const { text } = await readRepoFile(github, CONTENT_FILE_PATH);
    return Response.json({ content: JSON.parse(text), source: 'github', githubConfigured: true });
  } catch (error) {
    return Response.json({
      content: localContent,
      source: 'local',
      githubConfigured: true,
      warning: `Could not load from GitHub (${(error as Error).message}). Showing the deployed copy instead.`,
    });
  }
}
