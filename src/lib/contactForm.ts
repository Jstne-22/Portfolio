export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactField = keyof ContactMessage;

export type ContactErrors = Partial<Record<ContactField, string>>;

const MIN_MESSAGE_LENGTH = 10;

// Deliberately simple: something@something.tld, no spaces.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Checks the form on submit; returns one message per invalid field (empty when valid). */
export function validateContact(values: ContactMessage): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!name) errors.name = 'Your name is required.';
  if (!email) errors.email = 'Your email is required.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address, like name@example.com.';
  if (!subject) errors.subject = 'A subject is required.';
  if (!message) errors.message = 'A message is required.';
  else if (message.length < MIN_MESSAGE_LENGTH)
    errors.message = `Your message needs at least ${MIN_MESSAGE_LENGTH} characters.`;

  return errors;
}

/** A `mailto:` URL to the Owner, with the subject and a body combining the Visitor's name, email and message. */
export function buildMailto(ownerEmail: string, values: ContactMessage): string {
  // mailto bodies use CRLF line breaks (RFC 6068); some email apps collapse a bare LF.
  const body = [`Name: ${values.name.trim()}`, `Email: ${values.email.trim()}`, '', values.message.trim()].join('\r\n');
  return `mailto:${ownerEmail}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`;
}
