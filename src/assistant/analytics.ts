// Anonymous interaction events. Sent only when Google Analytics (gtag) is already configured on the page.
// Never includes the visitor's text or any personal data: only counts and short labels.
type Params = Record<string, string | number | boolean>;

export function track(name: string, params: Params = {}): void {
  try {
    const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') gtag('event', name, params);
  } catch { /* analytics must never break the assistant */ }
}

export const lengthBucket = (n: number) => (n < 20 ? 'short' : n < 60 ? 'medium' : 'long');
