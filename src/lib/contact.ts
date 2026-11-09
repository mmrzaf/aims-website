import { site } from '../config/site.mjs';

export interface ContactChannel {
  key: 'email' | 'phone' | 'whatsapp' | 'telegram';
  display: string;
  href: string;
  external: boolean;
}

export function channels(): ContactChannel[] {
  const { email, phone, whatsapp, telegram } = site.contact;
  const result: ContactChannel[] = [];
  if (email) result.push({ key: 'email', display: email, href: `mailto:${email}`, external: false });
  if (phone) result.push({ key: 'phone', display: phone, href: `tel:${phone.replace(/[^\d+]/g, '')}`, external: false });
  if (whatsapp) result.push({ key: 'whatsapp', display: `+${whatsapp}`, href: `https://wa.me/${whatsapp}`, external: true });
  if (telegram) result.push({ key: 'telegram', display: `@${telegram}`, href: `https://t.me/${telegram}`, external: true });
  return result;
}
