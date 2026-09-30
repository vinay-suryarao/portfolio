'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Lock, LogOut, UploadCloud, RotateCcw, ExternalLink, Loader2 } from 'lucide-react';
import type { PortfolioContent } from '@/data/portfolio';
import { FieldDef, ListEditor, ObjectEditor } from './fields';
import styles from './Admin.module.css';

/* ─── Section definitions ─── */

const DRIVE_HINT = 'Google Drive link: set sharing to "Anyone with the link".';

const personalFields: FieldDef[] = [
  { key: 'name', label: 'Full name', type: 'text' },
  { key: 'firstName', label: 'First name (hero heading)', type: 'text' },
  { key: 'lastName', label: 'Last name', type: 'text' },
  { key: 'role', label: 'Role (About card)', type: 'text' },
  { key: 'tagline', label: 'Tagline', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'whatsapp', label: 'WhatsApp number', type: 'text', hint: 'With country code, e.g. 919373168180. Leave empty to hide.' },
  { key: 'github', label: 'GitHub URL', type: 'text' },
  { key: 'linkedin', label: 'LinkedIn URL', type: 'text' },
  { key: 'typingWords', label: 'Hero typing words', type: 'tags', placeholder: 'Web Developer, DevOps Enthusiast' },
  { key: 'heroSubtitle', label: 'Hero subtitle', type: 'textarea' },
  { key: 'about', label: 'About / Biography', type: 'textarea' },
  { key: 'avatar', label: 'Profile photo', type: 'image', hint: DRIVE_HINT },
  { key: 'resumeUrl', label: 'Resume (PDF)', type: 'file', hint: `Used by the "Download CV" button. ${DRIVE_HINT}` },
];

const seoFields: FieldDef[] = [
  { key: 'title', label: 'Browser / Google title', type: 'text' },
  { key: 'siteUrl', label: 'Website URL', type: 'text' },
  { key: 'description', label: 'Meta description', type: 'textarea' },
];

type ListSection = {
  kind: 'list';
  key: keyof PortfolioContent;
  label: string;
  itemName: string;
  titleKey: string;
  subtitleKey?: string;
  fields: FieldDef[];
  newItem: () => Record<string, unknown>;
  note?: string;
};

type ObjectSection = {
  kind: 'object';
  key: 'personal' | 'seo';
  label: string;
  fields: FieldDef[];
  note?: string;
};

const sections: (ListSection | ObjectSection)[] = [
  { kind: 'object', key: 'personal', label: 'Personal & Resume', fields: personalFields },
  {
    kind: 'list', key: 'stats', label: 'Hero Stats', itemName: 'stat', titleKey: 'label', subtitleKey: 'value',
    note: 'The first 3 stats are shown in the hero section.',
    fields: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'value', label: 'Value (shown as N+)', type: 'number' },
    ],
    newItem: () => ({ label: '', value: 0 }),
  },
  {
    kind: 'list', key: 'skillCategories', label: 'Skills', itemName: 'skill category', titleKey: 'title', subtitleKey: 'icon',
    fields: [
      { key: 'title', label: 'Category title', type: 'text' },
      { key: 'icon', label: 'Icon (emoji)', type: 'text' },
      { key: 'skills', label: 'Skills', type: 'tags' },
    ],
    newItem: () => ({ title: '', icon: '⭐', skills: [] }),
  },
  {
    kind: 'list', key: 'experience', label: 'Experience', itemName: 'experience', titleKey: 'role', subtitleKey: 'company',
    fields: [
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'company', label: 'Company / Organisation', type: 'text' },
      { key: 'duration', label: 'Duration', type: 'text', placeholder: 'April 2025 – Present' },
      { key: 'type', label: 'Type', type: 'text', placeholder: 'work or position' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
    newItem: () => ({ role: '', company: '', duration: '', type: 'work', description: '' }),
  },
  {
    kind: 'list', key: 'education', label: 'Education', itemName: 'education', titleKey: 'degree', subtitleKey: 'institution',
    fields: [
      { key: 'degree', label: 'Degree', type: 'text' },
      { key: 'institution', label: 'Institution', type: 'text' },
      { key: 'duration', label: 'Duration', type: 'text' },
      { key: 'coursework', label: 'Relevant coursework', type: 'textarea' },
    ],
    newItem: () => ({ degree: '', institution: '', duration: '', coursework: '' }),
  },
  {
    kind: 'list', key: 'projects', label: 'Projects', itemName: 'project', titleKey: 'title',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'featured', label: 'Featured', type: 'checkbox', hint: 'Show under "Featured" filter' },
      { key: 'github', label: 'GitHub URL', type: 'text', placeholder: 'https://github.com/... (or # to hide)' },
      { key: 'live', label: 'Live URL', type: 'text', placeholder: 'https://... (or # to hide)' },
      { key: 'tech', label: 'Tech stack', type: 'tags' },
      { key: 'image', label: 'Project image', type: 'image', hint: DRIVE_HINT },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
    newItem: () => ({ title: '', description: '', tech: [], image: '', github: '#', live: '#', featured: true }),
  },
  {
    kind: 'list', key: 'certifications', label: 'Certifications', itemName: 'certification', titleKey: 'title', subtitleKey: 'issuer',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'issuer', label: 'Issuer', type: 'text' },
      { key: 'icon', label: 'Icon (emoji)', type: 'text' },
      { key: 'file', label: 'Certificate file (image / PDF)', type: 'file', hint: `Adds a "View Certificate" link. ${DRIVE_HINT}` },
    ],
    newItem: () => ({ title: '', issuer: '', icon: '📜', file: '' }),
  },
  {
    kind: 'list', key: 'awards', label: 'Awards', itemName: 'award', titleKey: 'title', subtitleKey: 'organization',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'organization', label: 'Organisation', type: 'text' },
      { key: 'icon', label: 'Icon (emoji)', type: 'text' },
      { key: 'file', label: 'Certificate / proof (image / PDF)', type: 'file', hint: DRIVE_HINT },
    ],
    newItem: () => ({ title: '', organization: '', icon: '🏆', file: '' }),
  },
  {
    kind: 'list', key: 'gallery', label: 'Gallery', itemName: 'photo', titleKey: 'alt',
    fields: [
      { key: 'alt', label: 'Caption / alt text', type: 'text' },
      { key: 'src', label: 'Photo', type: 'image', hint: DRIVE_HINT },
    ],
    newItem: () => ({ src: '', alt: '' }),
  },
  { kind: 'object', key: 'seo', label: 'SEO', fields: seoFields },
];

/* ─── Login ─── */

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) onSuccess();
    else setError((await res.json().catch(() => ({}))).error || 'Login failed');
  };

  return (
    <div className={styles.loginWrap}>
      <form className={styles.loginCard} onSubmit={submit}>
        <div className={styles.loginIcon}><Lock size={22} /></div>
        <h1 className={styles.loginTitle}>Admin</h1>
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.primaryBtn} disabled={loading || !password}>
          {loading ? <Loader2 size={16} className={styles.spin} /> : null} Log in
        </button>
      </form>
    </div>
  );
}

/* ─── Main app ─── */

type Status = { type: 'success' | 'error' | 'info'; text: string; link?: string } | null;

export default function AdminApp() {
  const [auth, setAuth] = useState<'checking' | 'out' | 'in'>('checking');
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [original, setOriginal] = useState<string>('');
  const [meta, setMeta] = useState<{ source: string; githubConfigured: boolean }>({ source: '', githubConfigured: false });
  const [active, setActive] = useState(sections[0].key);
  const [message, setMessage] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [resetKey, setResetKey] = useState(0);
  const loaded = useRef(false);

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/content', { cache: 'no-store' });
    if (res.status === 401) return setAuth('out');
    const data = await res.json();
    setContent(data.content);
    setOriginal(JSON.stringify(data.content));
    setMeta({ source: data.source, githubConfigured: data.githubConfigured });
    if (data.warning) setStatus({ type: 'error', text: data.warning });
  }, []);

  useEffect(() => {
    fetch('/api/admin/session', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => setAuth(d.authenticated ? 'in' : 'out'))
      .catch(() => setAuth('out'));
  }, []);

  useEffect(() => {
    // Load once; re-logging in after an expired session keeps unsaved edits.
    if (auth === 'in' && !loaded.current) {
      loaded.current = true;
      load();
    }
  }, [auth, load]);

  const dirty = useMemo(() => !!content && JSON.stringify(content) !== original, [content, original]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const logout = async () => {
    if (dirty && !confirm('You have unpublished changes. Log out anyway?')) return;
    await fetch('/api/admin/logout', { method: 'POST' });
    setContent(null);
    loaded.current = false;
    setAuth('out');
  };

  const discard = () => {
    if (confirm('Discard all unpublished changes?')) {
      setContent(JSON.parse(original));
      setResetKey((k) => k + 1);
      setStatus(null);
    }
  };

  const publish = async () => {
    if (!content) return;
    setPublishing(true);
    setStatus({ type: 'info', text: 'Pushing to GitHub…' });
    const res = await fetch('/api/admin/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, message }),
    });
    const data = await res.json().catch(() => ({}));
    setPublishing(false);
    if (res.ok) {
      setOriginal(JSON.stringify(content));
      setMessage('');
      setStatus({
        type: 'success',
        text: 'Committed to GitHub. The live site will update once the new deployment finishes (usually 1–2 minutes).',
        link: data.commitUrl,
      });
    } else if (res.status === 401) {
      setStatus({ type: 'error', text: 'Session expired. Log in again (your edits stay on this page).' });
      setAuth('out');
    } else {
      setStatus({ type: 'error', text: data.error || 'Publish failed' });
    }
  };

  if (auth === 'checking') {
    return <div className={styles.center}><Loader2 className={styles.spin} /></div>;
  }

  if (auth === 'out') {
    return <Login onSuccess={() => setAuth('in')} />;
  }

  if (!content) {
    return <div className={styles.center}><Loader2 className={styles.spin} /></div>;
  }

  const section = sections.find((s) => s.key === active)!;
  const setSection = (value: unknown) => setContent({ ...content, [section.key]: value });

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          Portfolio Admin
          <span className={`${styles.badge} ${meta.source === 'github' ? styles.badgeOk : ''}`}>
            {meta.source === 'github' ? 'Loaded from GitHub' : 'Loaded from deployed copy'}
          </span>
        </div>
        <div className={styles.topActions}>
          <a href="/" target="_blank" rel="noopener noreferrer" className={styles.ghostBtn}>
            View site <ExternalLink size={14} />
          </a>
          <button className={styles.ghostBtn} onClick={logout}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div className={styles.layout}>
        <nav className={styles.sidebar}>
          {sections.map((s) => (
            <button
              key={s.key}
              className={`${styles.navBtn} ${active === s.key ? styles.navActive : ''}`}
              onClick={() => setActive(s.key)}
            >
              {s.label}
              {s.kind === 'list' && (
                <span className={styles.count}>{(content[s.key] as unknown[]).length}</span>
              )}
            </button>
          ))}
        </nav>

        <main className={styles.main}>
          <h2 className={styles.sectionTitle}>{section.label}</h2>
          {section.note && <p className={styles.note}>{section.note}</p>}

          {section.kind === 'object' ? (
            <ObjectEditor
              key={`${section.key}-${resetKey}`}
              value={content[section.key] as unknown as Record<string, unknown>}
              fields={section.fields}
              onChange={setSection}
            />
          ) : (
            <ListEditor
              key={`${section.key}-${resetKey}`}
              items={content[section.key] as unknown as (Record<string, unknown> & { id: number })[]}
              fields={section.fields}
              titleKey={section.titleKey}
              subtitleKey={section.subtitleKey}
              itemName={section.itemName}
              newItem={section.newItem}
              onChange={setSection}
            />
          )}
        </main>
      </div>

      <footer className={styles.publishBar}>
        {status && (
          <div className={`${styles.status} ${styles[status.type]}`}>
            {status.text}
            {status.link && (
              <a href={status.link} target="_blank" rel="noopener noreferrer" className={styles.smallLink}>
                View commit <ExternalLink size={12} />
              </a>
            )}
          </div>
        )}
        <div className={styles.publishRow}>
          <span className={styles.dirty}>{dirty ? '● Unpublished changes' : 'All changes published'}</span>
          <input
            className={`${styles.input} ${styles.commitInput}`}
            placeholder="Commit message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className={styles.ghostBtn} onClick={discard} disabled={!dirty || publishing}>
            <RotateCcw size={14} /> Discard
          </button>
          <button
            className={styles.primaryBtn}
            onClick={publish}
            disabled={!dirty || publishing || !meta.githubConfigured}
            title={meta.githubConfigured ? '' : 'Set GITHUB_TOKEN and GITHUB_REPO to enable publishing'}
          >
            {publishing ? <Loader2 size={16} className={styles.spin} /> : <UploadCloud size={16} />}
            Commit &amp; Push to GitHub
          </button>
        </div>
        {!meta.githubConfigured && (
          <p className={styles.hint}>Publishing is disabled: GITHUB_TOKEN / GITHUB_REPO are not set on the server.</p>
        )}
      </footer>
    </div>
  );
}
