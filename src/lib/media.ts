// Helpers that turn Google Drive share links into URLs the browser can use
// directly. Non-Drive URLs (and local /public paths) are returned unchanged.
//
// Supported Drive link shapes:
//   https://drive.google.com/file/d/<ID>/view?usp=sharing
//   https://drive.google.com/open?id=<ID>
//   https://drive.google.com/uc?id=<ID>&export=download
//   https://docs.google.com/uc?id=<ID>

export function getDriveFileId(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (!/(^|\.)(drive|docs)\.google\.com$/.test(u.hostname)) return null;
    const pathMatch = u.pathname.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (pathMatch) return pathMatch[1];
    return u.searchParams.get('id');
  } catch {
    return null;
  }
}

/** Direct image URL, usable in <img>/<Image>. */
export function toImageUrl(url: string): string {
  const id = getDriveFileId(url);
  return id ? `https://lh3.googleusercontent.com/d/${id}=w2000` : url;
}

/** URL that downloads the file (used for the resume button). */
export function toDownloadUrl(url: string): string {
  const id = getDriveFileId(url);
  return id ? `https://drive.google.com/uc?export=download&id=${id}` : url;
}

/** URL that opens the file in Drive's viewer (good for PDFs / certificates). */
export function toViewUrl(url: string): string {
  const id = getDriveFileId(url);
  return id ? `https://drive.google.com/file/d/${id}/view` : url;
}

export function isExternal(url: string): boolean {
  return /^https?:\/\//i.test(url);
}
