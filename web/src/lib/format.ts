import i18n from '../i18n';

// Formats a date in the user's local timezone.
// Handles two stored shapes: SQLite datetime('now') = naive UTC "YYYY-MM-DD HH:MM:SS"
// (no tz → treat as UTC) and full ISO with a tz designator ("…Z" / "+02:00" → keep as-is).
export function fmtDate(iso?: string | null): string {
  if (!iso) return '—';
  const norm = iso.replace(' ', 'T');
  const hasTz = /Z$|[+-]\d{2}:?\d{2}$/.test(norm);
  const d = new Date(hasTz ? norm : norm + 'Z');
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString(i18n.language, { dateStyle: 'medium', timeStyle: 'short' });
}

// Compact uptime from an ISO launch time (e.g. "2d 4h", "5h 12m", "8m").
export function fmtUptime(iso?: string | null): string {
  if (!iso) return '—';
  const start = new Date(iso).getTime();
  if (isNaN(start)) return '—';
  let s = Math.max(0, Math.floor((Date.now() - start) / 1000));
  const d = Math.floor(s / 86400);
  s -= d * 86400;
  const h = Math.floor(s / 3600);
  s -= h * 3600;
  const m = Math.floor(s / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}
