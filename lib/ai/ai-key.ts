export const GEMINI_KEY_STORAGE_KEY = 'cogniva_custom_gemini_key';
export const GEMINI_KEY_EVENT = 'cogniva-gemini-key-change';

export function getStoredGeminiKey(): string {
  if (typeof window === 'undefined') return '';
  try {
    return localStorage.getItem(GEMINI_KEY_STORAGE_KEY)?.trim() || '';
  } catch {
    return '';
  }
}

export function setStoredGeminiKey(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    const trimmed = key.trim();
    if (trimmed) {
      localStorage.setItem(GEMINI_KEY_STORAGE_KEY, trimmed);
    } else {
      localStorage.removeItem(GEMINI_KEY_STORAGE_KEY);
    }
    window.dispatchEvent(new CustomEvent(GEMINI_KEY_EVENT, { detail: { apiKey: trimmed } }));
  } catch (e) {
    console.error('Failed to save Gemini API key in localStorage', e);
  }
}

export function removeStoredGeminiKey(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(GEMINI_KEY_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(GEMINI_KEY_EVENT, { detail: { apiKey: '' } }));
  } catch (e) {
    console.error('Failed to remove Gemini API key from localStorage', e);
  }
}

export function hasCustomGeminiKey(): boolean {
  return !!getStoredGeminiKey();
}

export function getGeminiAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const key = getStoredGeminiKey();
  if (key) {
    headers['x-gemini-key'] = key;
  }
  return headers;
}
