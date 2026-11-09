const env = process.env;

/**
 * Public identity and contact configuration.
 *
 * Everything that depends on the company name, domain or contact details is
 * defined here or in environment variables, so the final identity can be
 * introduced without touching templates or content.
 */
export const site = {
  url: (env.PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, ''),
  name: {
    en: env.PUBLIC_COMPANY_NAME_EN || 'AIMS',
    fa: env.PUBLIC_COMPANY_NAME_FA || 'آیمز',
  },
  contact: {
    email: env.PUBLIC_CONTACT_EMAIL || '',
    phone: env.PUBLIC_CONTACT_PHONE || '',
    whatsapp: env.PUBLIC_CONTACT_WHATSAPP || '',
    telegram: env.PUBLIC_CONTACT_TELEGRAM || '',
    /** Optional HTTPS endpoint that accepts the contact form as JSON. */
    formEndpoint: env.PUBLIC_CONTACT_FORM_ENDPOINT || '',
  },
};
