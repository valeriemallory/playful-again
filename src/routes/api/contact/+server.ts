import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Generic placeholder endpoint — not yet wired up to an email provider.
// TODO: Connect this to an email service (e.g. Resend) once a studio email
// account and API key are ready, then send to STUDIO_EMAIL below.
const STUDIO_EMAIL = 'valerie@valeriemallory.com';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json().catch(() => null);
  if (!body) return json({ error: 'Invalid request body.' }, { status: 400 });

  const { name, email, message } = body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  return json(
    { error: `This form isn't connected yet. Please email us directly at ${STUDIO_EMAIL}.` },
    { status: 503 }
  );
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
