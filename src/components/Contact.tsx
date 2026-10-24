import { Mail, MapPin, Send } from 'lucide-react';
import { useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  buildMailto,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactMessage,
} from '../lib/contactForm';
import { navigateTo } from '../lib/navigate';
import type { SiteConfig, SocialKind } from '../types';
import Section from './Section';
import SocialIcon from './SocialIcon';

interface ContactProps {
  site: SiteConfig;
}

// Visible titles for profile links; email has its own row and button.
const profileTitles: Record<Exclude<SocialKind, 'email'>, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
};

export default function Contact({ site }: ContactProps) {
  const mailto = `mailto:${site.email}`;
  const profiles = site.socials.flatMap((social) => (social.kind === 'email' ? [] : [{ ...social, kind: social.kind }]));

  return (
    <Section id="contact" eyebrow="Contact me" title="Let’s Work Together">
      <div className="contact">
        <div className="contact__info">
          <p className="contact__lead">Have a question, an opportunity or just want to say hello? My inbox is open.</p>
          <ul className="contact__list">
            <li className="glass-card contact__item">
              <Mail size={20} aria-hidden="true" />
              <div>
                <p className="contact__label">Email</p>
                <a href={mailto} className="contact__value">
                  {site.email}
                </a>
              </div>
            </li>
            {profiles.map((profile) => (
              <li key={profile.kind} className="glass-card contact__item">
                <SocialIcon kind={profile.kind} size={20} />
                <div>
                  <p className="contact__label">{profileTitles[profile.kind]}</p>
                  <a href={profile.url} className="contact__value" target="_blank" rel="noopener noreferrer">
                    {profile.url.replace(/^https?:\/\/(www\.)?/, '')}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </li>
            ))}
            <li className="glass-card contact__item">
              <MapPin size={20} aria-hidden="true" />
              <div>
                <p className="contact__label">Location</p>
                <p className="contact__value">{site.location}</p>
              </div>
            </li>
          </ul>
          <a href={mailto} className="btn btn--primary contact__email-button">
            Email me
            <Mail size={18} aria-hidden="true" />
          </a>
        </div>

        <ContactForm ownerEmail={site.email} />
      </div>
    </Section>
  );
}

const emptyMessage: ContactMessage = { name: '', email: '', subject: '', message: '' };
const fieldOrder: ContactField[] = ['name', 'email', 'subject', 'message'];

function ContactForm({ ownerEmail }: { ownerEmail: string }) {
  const [values, setValues] = useState<ContactMessage>(emptyMessage);
  const [errors, setErrors] = useState<ContactErrors>({});
  // Bumped on each failed submit so the summary alert re-mounts and is announced again.
  const [failedSubmits, setFailedSubmits] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const baseId = useId();
  const helpId = `${baseId}-help`;

  const setField = (field: ContactField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // A field's error clears as soon as the Visitor edits it.
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setFailedSubmits((n) => n + 1);
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    navigateTo(buildMailto(ownerEmail, values));
  };

  const invalidCount = fieldOrder.filter((field) => errors[field]).length;
  const field = (name: ContactField) => ({
    baseId,
    name,
    value: values[name],
    error: errors[name],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setField(name, event.target.value),
  });

  return (
    <form ref={formRef} className="glass-card contact-form" noValidate onSubmit={onSubmit}>
      <div className="contact-form__row">
        <Field label="Name" autoComplete="name" {...field('name')} />
        <Field label="Email" type="email" autoComplete="email" {...field('email')} />
      </div>
      <Field label="Subject" {...field('subject')} />
      <Field label="Message" multiline {...field('message')} />

      {invalidCount > 0 && (
        <p key={failedSubmits} className="form-error form-error--summary" role="alert">
          Please fix {invalidCount === 1 ? 'the highlighted field' : `the ${invalidCount} highlighted fields`}.
        </p>
      )}
      <p id={helpId} className="contact-form__help">
        This form doesn’t send anything from the website. Submitting it opens your own email app with the message
        filled in, ready for you to send.
      </p>
      <button type="submit" className="btn btn--primary contact-form__submit" aria-describedby={helpId}>
        Open in my email app
        <Send size={16} aria-hidden="true" />
      </button>
    </form>
  );
}

interface FieldProps {
  baseId: string;
  name: ContactField;
  label: string;
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
}

/** A labelled input (or textarea) with its inline error, wired together by ids. */
function Field({ baseId, name, label, value, error, onChange, type = 'text', autoComplete, multiline }: FieldProps) {
  const inputId = `${baseId}-${name}`;
  const errorId = `${inputId}-error`;
  const inputProps = {
    id: inputId,
    name,
    value,
    onChange,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
  };

  return (
    <div className="form-field">
      <label htmlFor={inputId}>{label}</label>
      {multiline ? <textarea rows={5} {...inputProps} /> : <input type={type} autoComplete={autoComplete} {...inputProps} />}
      {error && (
        <p id={errorId} className="form-error">
          {error}
        </p>
      )}
    </div>
  );
}
