import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { Resend } from 'resend';
import type { RequestHandler } from './$types';

// Contact form endpoint: validates the form and emails it to Valerie via Resend.
// RESEND_API_KEY comes from .env locally and from the Netlify site's environment
// variables in production (see dev-notes.txt). Copied from valerie-mallory-studio;
// only SITE_NAME and SITE_URL differ between the four sites.
const SITE_NAME = 'Playful Again';
const SITE_URL = 'https://playfulagain.org';
const TO_EMAIL = 'valerie@valeriemallory.com';
// Sent from the verified valeriemallory.com domain; the address doesn't need a mailbox.
const FROM_EMAIL = `${SITE_NAME} website <contact@valeriemallory.com>`;

const MAX_LENGTH = { name: 200, email: 320, subject: 200, message: 10000 };

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const field = (key: string) => {
    const value = (body as Record<string, unknown>)[key];
    return typeof value === 'string' ? value.trim() : '';
  };
  const name = field('name');
  const email = field('email');
  const subject = field('subject');
  const message = field('message');

  // Honeypot: the "website" field is hidden from people, so only bots fill it in.
  // Pretend it worked so they don't retry, but don't send anything.
  if (field('website')) return json({ ok: true });

  if (!name || !email || !message) {
    return json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  if (
    name.length > MAX_LENGTH.name ||
    email.length > MAX_LENGTH.email ||
    subject.length > MAX_LENGTH.subject ||
    message.length > MAX_LENGTH.message
  ) {
    return json({ error: 'Your message is too long. Please shorten it and try again.' }, { status: 400 });
  }

  if (!env.RESEND_API_KEY) {
    return json(
      { error: `This form isn't connected yet. Please email us directly at ${TO_EMAIL}.` },
      { status: 503 }
    );
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    // Hitting Reply in Valerie's mail app answers the visitor directly
    replyTo: email,
    subject: `[${SITE_NAME}] ${subject || `Message from ${name}`}`,
    // Plain text only, so nothing a visitor types can be rendered as HTML
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject || '(none)'}`,
      '',
      message,
      '',
      '---',
      `Sent from the contact form at ${SITE_URL}/contact`,
    ].join('\n'),
  });

  if (error) {
    console.error('Resend error:', error);
    return json(
      { error: `Sorry, your message couldn't be sent. Please email us directly at ${TO_EMAIL}.` },
      { status: 502 }
    );
  }

  return json({ ok: true });
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
