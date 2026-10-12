export const themeState = $state({ mode: 'light' as 'light' | 'dark' });

export function initTheme(): void {
  if (typeof window === 'undefined') return;
  const saved = localStorage.getItem('vms-theme') as 'light' | 'dark' | null;
  const preferred: 'light' | 'dark' = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(saved ?? preferred);
}

export function toggleTheme(): void {
  applyTheme(themeState.mode === 'light' ? 'dark' : 'light');
}

function applyTheme(mode: 'light' | 'dark'): void {
  themeState.mode = mode;
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem('vms-theme', mode);
}
