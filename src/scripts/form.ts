export {};

/**
 * Contact form controller.
 * - Accessible validation: inline errors (aria-invalid + aria-describedby) and an error summary.
 * - Never simulates a submission: with no endpoint configured it shows the "not active yet"
 *   panel with real alternatives (email, phone, pre-filled email draft).
 * - Spam protection hooks: honeypot field and elapsed time sent along with the payload.
 */

type FieldElement = HTMLInputElement | HTMLTextAreaElement;

const REQUEST_TIMEOUT_MS = 15000;

function messageFor(field: FieldElement, form: HTMLFormElement): string {
  const v = field.validity;
  const d = field.dataset;
  if (v.valueMissing) return d.msgRequired ?? form.dataset.msgRequired ?? 'Questo campo è obbligatorio.';
  if (v.typeMismatch) return d.msgType ?? 'Controlla il formato.';
  if (v.patternMismatch) return d.msgPattern ?? 'Controlla il formato.';
  if (v.tooShort) return d.msgShort ?? 'Il testo è troppo breve.';
  if (v.tooLong) return d.msgLong ?? 'Il testo è troppo lungo.';
  return field.validationMessage;
}

function describedBy(field: FieldElement, errorId: string, add: boolean) {
  const ids = new Set((field.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean));
  if (add) ids.add(errorId);
  else ids.delete(errorId);
  if (ids.size) field.setAttribute('aria-describedby', [...ids].join(' '));
  else field.removeAttribute('aria-describedby');
}

function initForm(form: HTMLFormElement) {
  const container = form.closest<HTMLElement>('[data-contact]') ?? form.parentElement!;
  const summary = form.querySelector<HTMLElement>('[data-form-summary]');
  const summaryList = summary?.querySelector<HTMLElement>('[data-form-summary-list]');
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');
  const success = container.querySelector<HTMLElement>('[data-form-success]');
  const fallback = container.querySelector<HTMLElement>('[data-form-fallback]');
  const failure = container.querySelector<HTMLElement>('[data-form-failure]');
  const honeypot = form.querySelector<HTMLInputElement>('[data-honeypot]');
  const endpoint = (form.dataset.endpoint ?? '').trim();
  const startedAt = Date.now();
  const fields = [...form.querySelectorAll<FieldElement>('input:not([type="hidden"]):not([data-honeypot]), textarea')].filter(
    (f) => f.willValidate,
  );

  const showError = (field: FieldElement, show: boolean) => {
    const errorId = `${field.id}-error`;
    const error = form.querySelector<HTMLElement>(`#${CSS.escape(errorId)}`);
    if (!error) return;
    if (show) {
      error.textContent = messageFor(field, form);
      error.hidden = false;
      field.setAttribute('aria-invalid', 'true');
      describedBy(field, errorId, true);
    } else {
      error.textContent = '';
      error.hidden = true;
      field.removeAttribute('aria-invalid');
      describedBy(field, errorId, false);
    }
  };

  const validate = (field: FieldElement) => {
    const valid = field.checkValidity();
    showError(field, !valid);
    return valid;
  };

  // Validate on leaving a field once the user has typed; re-validate live while an error is shown.
  fields.forEach((field) => {
    field.addEventListener('blur', () => {
      if (field.value !== '' || field.dataset.touched === 'true') validate(field);
    });
    field.addEventListener('input', () => {
      field.dataset.touched = 'true';
      if (field.getAttribute('aria-invalid') === 'true') validate(field);
    });
    field.addEventListener('change', () => {
      if (field.type === 'checkbox' && field.getAttribute('aria-invalid') === 'true') validate(field);
    });
  });

  const renderSummary = (invalid: FieldElement[]) => {
    if (!summary || !summaryList) return;
    summaryList.replaceChildren(
      ...invalid.map((field) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${field.id}`;
        const label = form.querySelector(`label[for="${CSS.escape(field.id)}"]`);
        const name = (label?.getAttribute('data-label') ?? label?.textContent ?? field.name).replace(/\s*\*\s*$/, '').trim();
        a.textContent = `${name}: ${messageFor(field, form)}`;
        a.addEventListener('click', (event) => {
          event.preventDefault();
          field.focus();
        });
        li.append(a);
        return li;
      }),
    );
    summary.hidden = invalid.length === 0;
  };

  const setStatus = (text: string) => {
    if (status) status.textContent = text;
  };

  const collect = () => {
    const data = new FormData(form);
    data.delete(honeypot?.name ?? '_gotcha');
    data.set('_elapsed_ms', String(Date.now() - startedAt));
    data.set('_page', window.location.pathname);
    return data;
  };

  const mailtoDraft = (data: FormData) => {
    const interests = data.getAll('interesse').join(', ');
    const lines = [
      `Nome e cognome: ${data.get('nome') ?? ''}`,
      `Email: ${data.get('email') ?? ''}`,
      `Telefono: ${data.get('telefono') ?? ''}`,
      `Azienda / Ente: ${data.get('azienda') ?? ''}`,
      `Mi interessa: ${interests}`,
      '',
      String(data.get('messaggio') ?? ''),
    ];
    const subject = `Richiesta dal sito ITnode${interests ? ` — ${interests}` : ''}`;
    const to = form.dataset.fallbackEmail ?? 'info@itnode.it';
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  const reveal = (panel: HTMLElement | null) => {
    if (!panel) return;
    panel.hidden = false;
    panel.focus();
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (failure) failure.hidden = true;

    const invalid = fields.filter((field) => !validate(field));
    renderSummary(invalid);
    if (invalid.length) {
      summary?.focus();
      return;
    }

    const data = collect();

    // A filled honeypot means an automated submission: do not send, and never fake a success.
    if (honeypot && honeypot.value.trim() !== '') {
      reveal(failure);
      return;
    }

    if (!endpoint) {
      const draft = fallback?.querySelector<HTMLAnchorElement>('[data-mailto-draft]');
      if (draft) draft.href = mailtoDraft(data);
      form.hidden = true;
      reveal(fallback);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    form.setAttribute('aria-busy', 'true');
    form.dataset.state = 'sending';
    if (submit) submit.disabled = true;
    setStatus(form.dataset.msgSending ?? 'Invio in corso…');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      form.hidden = true;
      setStatus('');
      reveal(success);
    } catch {
      form.dataset.state = 'error';
      setStatus('');
      const draft = failure?.querySelector<HTMLAnchorElement>('[data-mailto-draft]');
      if (draft) draft.href = mailtoDraft(data);
      reveal(failure);
    } finally {
      window.clearTimeout(timer);
      form.removeAttribute('aria-busy');
      if (form.dataset.state === 'sending') form.dataset.state = 'idle';
      if (submit) submit.disabled = false;
    }
  });
}

document.querySelectorAll<HTMLFormElement>('form[data-contact-form]').forEach(initForm);
