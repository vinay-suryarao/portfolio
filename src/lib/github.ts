// Reads and writes a single file in the GitHub repo through the Contents API.
// Pushing a commit to the deploy branch triggers the hosting provider
// (e.g. Vercel) to rebuild, which is how admin edits go live.

interface GitHubConfig {
  token: string;
  repo: string;
  branch: string;
}

export function getGitHubConfig(): GitHubConfig | null {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token || !repo) return null;
  return { token, repo, branch: process.env.GITHUB_BRANCH || 'main' };
}

function headers(token: string) {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

async function githubError(res: Response): Promise<Error> {
  let detail = res.statusText;
  try {
    const body = await res.json();
    detail = body.message || detail;
  } catch {}
  return new Error(`GitHub API ${res.status}: ${detail}`);
}

export async function readRepoFile(config: GitHubConfig, path: string) {
  const url = `https://api.github.com/repos/${config.repo}/contents/${path}?ref=${encodeURIComponent(config.branch)}`;
  const res = await fetch(url, { headers: headers(config.token), cache: 'no-store' });
  if (!res.ok) throw await githubError(res);
  const data = await res.json();
  return {
    sha: data.sha as string,
    text: Buffer.from(data.content, 'base64').toString('utf8'),
  };
}

export async function writeRepoFile(
  config: GitHubConfig,
  path: string,
  text: string,
  message: string,
) {
  // Always fetch the latest sha right before writing so the commit applies
  // on top of whatever is currently on the branch.
  const { sha } = await readRepoFile(config, path);
  const res = await fetch(`https://api.github.com/repos/${config.repo}/contents/${path}`, {
    method: 'PUT',
    headers: { ...headers(config.token), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      content: Buffer.from(text, 'utf8').toString('base64'),
      sha,
      branch: config.branch,
    }),
  });
  if (!res.ok) throw await githubError(res);
  const data = await res.json();
  return { commitUrl: data.commit?.html_url as string | undefined };
}
