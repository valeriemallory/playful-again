<script lang="ts">
  let name = $state('');
  let email = $state('');
  let subject = $state('');
  let message = $state('');
  let website = $state(''); // honeypot: hidden from people, only bots fill it in
  let status = $state<'idle' | 'sending' | 'success' | 'error'>('idle');
  let errorMessage = $state('');

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (status === 'sending') return;
    status = 'sending';
    errorMessage = '';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, website }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message.');

      status = 'success';
      name = email = subject = message = website = '';
    } catch (err) {
      status = 'error';
      errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
    }
  }

  function reset() {
    status = 'idle';
    errorMessage = '';
  }
</script>

{#if status === 'success'}
  <div class="success-msg" role="status">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <p>Message sent! We'll be in touch soon.</p>
    <button class="btn-secondary" onclick={reset}>Send another message</button>
  </div>
{:else}
  <form class="contact-form" onsubmit={handleSubmit} novalidate>
    <!-- Honeypot field for spam bots: moved off-screen and skipped by keyboard
         and screen readers. The server drops any message that fills it in. -->
    <div class="hp-field" aria-hidden="true">
      <label for="cf-website">Website</label>
      <input id="cf-website" type="text" bind:value={website} tabindex="-1" autocomplete="off" />
    </div>

    <div class="field">
      <label for="cf-name">Name <span aria-hidden="true">*</span></label>
      <input
        id="cf-name"
        type="text"
        bind:value={name}
        required
        autocomplete="name"
        placeholder="Your name"
        disabled={status === 'sending'}
      />
    </div>

    <div class="field">
      <label for="cf-email">Email <span aria-hidden="true">*</span></label>
      <input
        id="cf-email"
        type="email"
        bind:value={email}
        required
        autocomplete="email"
        placeholder="your@email.com"
        disabled={status === 'sending'}
      />
    </div>

    <div class="field">
      <label for="cf-subject">Subject</label>
      <input
        id="cf-subject"
        type="text"
        bind:value={subject}
        placeholder="What's this about?"
        disabled={status === 'sending'}
      />
    </div>

    <div class="field">
      <label for="cf-message">Message <span aria-hidden="true">*</span></label>
      <textarea
        id="cf-message"
        bind:value={message}
        required
        rows="6"
        placeholder="Tell us about your project or inquiry…"
        disabled={status === 'sending'}
      ></textarea>
    </div>

    {#if status === 'error'}
      <p class="error-msg" role="alert">{errorMessage}</p>
    {/if}

    <button type="submit" class="btn-primary" disabled={status === 'sending'}>
      {status === 'sending' ? 'Sending…' : 'Send Message'}
    </button>
  </form>
{/if}

<style>
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .hp-field {
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  label {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--text-secondary);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  label span {
    color: var(--accent);
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-primary);
    font-family: inherit;
    font-size: 0.9375rem;
    transition: border-color 0.15s ease;
    outline: none;
    resize: vertical;
  }

  input:focus,
  textarea:focus {
    border-color: var(--accent);
  }

  input::placeholder,
  textarea::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }

  input:disabled,
  textarea:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-primary {
    align-self: flex-start;
    padding: 0.75rem 2rem;
    background: var(--accent);
    color: #ffffff;
    border: none;
    border-radius: 4px;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .btn-primary:hover:not(:disabled) {
    background: var(--accent-hover);
  }

  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-secondary {
    background: none;
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-family: inherit;
    font-size: 0.875rem;
    color: var(--text-secondary);
    cursor: pointer;
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .btn-secondary:hover {
    color: var(--text-primary);
    border-color: var(--text-secondary);
  }

  .error-msg {
    font-size: 0.875rem;
    color: #c0392b;
    margin: 0;
  }

  .success-msg {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
    padding: 2rem;
    color: var(--accent);
  }

  .success-msg p {
    margin: 0;
    font-size: 1rem;
    color: var(--text-primary);
  }
</style>
