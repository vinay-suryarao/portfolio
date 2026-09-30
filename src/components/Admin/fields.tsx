'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowUp, ArrowDown, Trash2, Plus, ExternalLink } from 'lucide-react';
import { getDriveFileId, toImageUrl, toViewUrl } from '@/lib/media';
import styles from './Admin.module.css';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'checkbox'
  | 'tags'
  | 'image'
  | 'file';

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  hint?: string;
  placeholder?: string;
}

type Obj = Record<string, unknown>;

/* ─── Single inputs ─── */

function TagsInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  // Keep the raw text locally so typing a trailing comma/space isn't eaten.
  const [text, setText] = useState(value.join(', '));
  return (
    <>
      <input
        className={styles.input}
        value={text}
        placeholder={placeholder ?? 'Comma separated, e.g. React, Node.js'}
        onChange={(e) => {
          setText(e.target.value);
          onChange(e.target.value.split(',').map((s) => s.trim()).filter(Boolean));
        }}
      />
      {value.length > 0 && (
        <div className={styles.tagPreview}>
          {value.map((t, i) => (
            <span key={`${t}-${i}`} className={styles.tag}>{t}</span>
          ))}
        </div>
      )}
    </>
  );
}

function MediaInput({ value, onChange, kind, placeholder }: { value: string; onChange: (v: string) => void; kind: 'image' | 'file'; placeholder?: string }) {
  const isDrive = !!getDriveFileId(value);
  return (
    <>
      <input
        className={styles.input}
        value={value}
        placeholder={placeholder ?? 'Paste Google Drive share link (or /images/... path)'}
        onChange={(e) => onChange(e.target.value.trim())}
      />
      {value && (
        <div className={styles.mediaPreview}>
          {kind === 'image' && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={toImageUrl(value)} alt="Preview" className={styles.previewImg} />
          )}
          <div className={styles.mediaMeta}>
            {isDrive && <span className={styles.badge}>Google Drive link detected</span>}
            <a href={toViewUrl(value)} target="_blank" rel="noopener noreferrer" className={styles.smallLink}>
              Open <ExternalLink size={12} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export function Field({ def, value, onChange }: { def: FieldDef; value: unknown; onChange: (v: unknown) => void }) {
  const control = (() => {
    switch (def.type) {
      case 'textarea':
        return (
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            value={(value as string) ?? ''}
            placeholder={def.placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            className={styles.input}
            value={(value as number) ?? 0}
            onChange={(e) => onChange(Number(e.target.value))}
          />
        );
      case 'checkbox':
        return (
          <label className={styles.checkbox}>
            <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
            <span>{def.hint ?? 'Enabled'}</span>
          </label>
        );
      case 'tags':
        return <TagsInput value={(value as string[]) ?? []} onChange={onChange} placeholder={def.placeholder} />;
      case 'image':
      case 'file':
        return <MediaInput value={(value as string) ?? ''} onChange={onChange} kind={def.type} placeholder={def.placeholder} />;
      default:
        return (
          <input
            className={styles.input}
            value={(value as string) ?? ''}
            placeholder={def.placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        );
    }
  })();

  return (
    <div className={`${styles.field} ${def.type === 'textarea' ? styles.fieldWide : ''}`}>
      <span className={styles.label}>{def.label}</span>
      {control}
      {def.hint && def.type !== 'checkbox' && <span className={styles.hint}>{def.hint}</span>}
    </div>
  );
}

/* ─── Object editor (e.g. personal info) ─── */

export function ObjectEditor({ value, fields, onChange }: { value: Obj; fields: FieldDef[]; onChange: (v: Obj) => void }) {
  return (
    <div className={styles.fieldGrid}>
      {fields.map((f) => (
        <Field key={f.key} def={f} value={value[f.key]} onChange={(v) => onChange({ ...value, [f.key]: v })} />
      ))}
    </div>
  );
}

/* ─── List editor (projects, certifications, ...) ─── */

type Item = Obj & { id: number };

export function ListEditor({
  items,
  fields,
  titleKey,
  subtitleKey,
  newItem,
  itemName,
  onChange,
}: {
  items: Item[];
  fields: FieldDef[];
  titleKey: string;
  subtitleKey?: string;
  newItem: () => Obj;
  itemName: string;
  onChange: (items: Item[]) => void;
}) {
  const [openId, setOpenId] = useState<number | null>(null);

  const update = (id: number, next: Item) => onChange(items.map((it) => (it.id === id ? next : it)));

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const remove = (item: Item) => {
    const name = (item[titleKey] as string) || `this ${itemName}`;
    if (confirm(`Delete "${name}"?`)) onChange(items.filter((it) => it.id !== item.id));
  };

  const add = () => {
    const id = items.reduce((max, it) => Math.max(max, it.id), 0) + 1;
    onChange([{ ...newItem(), id } as Item, ...items]);
    setOpenId(id);
  };

  return (
    <div className={styles.list}>
      <button className={styles.addBtn} onClick={add}>
        <Plus size={16} /> Add new {itemName}
      </button>

      {items.length === 0 && <p className={styles.empty}>No {itemName}s yet.</p>}

      {items.map((item, index) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className={`${styles.item} ${open ? styles.itemOpen : ''}`}>
            <div className={styles.itemHeader}>
              <button className={styles.itemToggle} onClick={() => setOpenId(open ? null : item.id)}>
                {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                <span className={styles.itemTitle}>{(item[titleKey] as string) || `Untitled ${itemName}`}</span>
                {subtitleKey && item[subtitleKey] ? (
                  <span className={styles.itemSubtitle}>{String(item[subtitleKey])}</span>
                ) : null}
              </button>
              <div className={styles.itemActions}>
                <button className={styles.iconBtn} onClick={() => move(index, -1)} disabled={index === 0} title="Move up">
                  <ArrowUp size={15} />
                </button>
                <button className={styles.iconBtn} onClick={() => move(index, 1)} disabled={index === items.length - 1} title="Move down">
                  <ArrowDown size={15} />
                </button>
                <button className={`${styles.iconBtn} ${styles.danger}`} onClick={() => remove(item)} title="Delete">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            {open && (
              <div className={styles.itemBody}>
                <ObjectEditor value={item} fields={fields} onChange={(v) => update(item.id, v as Item)} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
