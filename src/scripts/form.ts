/**
 * Contact form controller.
 * - Accessible validation: inline errors (aria-invalid + aria-describedby) and an error summary.
 * - Never simulates a submission: with no endpoint configured the page says so before the
 *   fields, and submitting prepares a real email draft instead.
 * - Spam protection hooks: honeypot field and elapsed time sent along with the payload.
 * - Measurement hooks per docs/cro/piano-misurazione.md (no personal data in events).
 */
import { track } from './track';

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
  // Custom validation replaces the browser bubbles only when this script runs;
  // without JavaScript the native validation still applies.
  form.noValidate = true;
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
  const formId = form.dataset.formId ?? 'richiesta';
  const interestBoxes = [...form.querySelectorAll<HTMLInputElement>('input[name="interesse"]')];
  const startedAt = Date.now();
  const fields = [...form.querySelectorAll<FieldElement>('input:not([type="hidden"]):not([data-honeypot]), textarea')].filter(
    (f) => f.willValidate,
  );

  // Preselect interests from ?interesse= (links from other pages) when the page did not preselect any.
  const fromQuery = new URLSearchParams(window.location.search)
    .getAll('interesse')
    .flatMap((value) => value.split(','))
    .map((value) => value.trim());
  if (fromQuery.length && !interestBoxes.some((box) => box.checked)) {
    interestBoxes.forEach((box) => {
      if (fromQuery.includes(box.value)) box.checked = true;
    });
  }
  const preselected = interestBoxes.filter((b) => b.checked).map((b) => b.value).join(',');

  // Measurement: form_view (once) when half of the form is visible, or when the form fills
  // half of the viewport (tall forms on small screens never reach 50%), and form_start.
  if ('IntersectionObserver' in window) {
    const viewObserver = new IntersectionObserver(
      ([entry]) => {
        const rootH = entry.rootBounds?.height ?? window.innerHeight;
        if (entry.intersectionRatio < 0.5 && entry.intersectionRect.height < rootH * 0.5) return;
        track('form_view', { form_id: formId, interest_preselected: preselected });
        viewObserver.disconnect();
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    viewObserver.observe(form);
  }
  let started = false;
  const onStart = () => {
    if (started) return;
    started = true;
    track('form_start', { form_id: formId, interest_preselected: preselected });
  };
  form.addEventListener('input', onStart);
  form.addEventListener('change', onStart);

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
        // Each message already names its field (docs/contenuti/microcopy.md §4.3).
        a.textContent = messageFor(field, form);
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
    data.set('_form', formId);
    return data;
  };

  const interestLabels = (data: FormData) =>
    data
      .getAll('interesse')
      .map((value) => interestBoxes.find((box) => box.value === value)?.dataset.label ?? String(value))
      .join(', ');

  const mailtoDraft = (data: FormData) => {
    const interests = interestLabels(data);
    const lines = [
      `Nome e cognome: ${data.get('nome') ?? ''}`,
      `Email: ${data.get('email') ?? ''}`,
      `Telefono: ${data.get('telefono') ?? ''}`,
      `Azienda o ente: ${data.get('azienda') ?? ''}`,
      `Mi interessa: ${interests}`,
      '',
      'Messaggio:',
      String(data.get('messaggio') ?? ''),
    ];
    const subject = `Richiesta dal sito ITnode${interests ? ` · ${interests}` : ''}`;
    const to = form.dataset.fallbackEmail ?? 'info@itnode.it';
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  // Panels replace the form or appear after it; focus goes to their title (microcopy §4.4).
  const reveal = (panel: HTMLElement | null) => {
    if (!panel) return;
    panel.hidden = false;
    const title = panel.querySelector<HTMLElement>('[data-panel-title]') ?? panel;
    if (!title.hasAttribute('tabindex')) title.tabIndex = -1;
    title.focus();
  };

  const optionalFilled = (data: FormData) =>
    ['telefono', 'azienda', 'messaggio'].filter((name) => String(data.get(name) ?? '').trim() !== '').join(',');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (form.dataset.state === 'sending') return;
    if (failure) failure.hidden = true;

    const invalid = fields.filter((field) => !validate(field));
    renderSummary(invalid);
    if (invalid.length) {
      track('form_error', { form_id: formId, error_type: 'validazione', error_fields: invalid.map((f) => f.name).join(',') });
      summary?.focus();
      return;
    }

    const data = collect();

    // A filled honeypot means an automated submission: do not send, and never fake a success.
    if (honeypot && honeypot.value.trim() !== '') {
      track('form_error', { form_id: formId, error_type: 'spam' });
      reveal(failure);
      return;
    }

    if (!endpoint) {
      track('form_error', { form_id: formId, error_type: 'endpoint-assente' });
      // The notice before the fields says the same as the fallback panel: keep one.
      container.querySelector('[data-form-inactive]')?.setAttribute('hidden', '');
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
    submit?.setAttribute('aria-disabled', 'true');
    setStatus(form.dataset.msgSending ?? 'Invio in corso…');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      if (!response.ok) {
        track('form_error', { form_id: formId, error_type: 'server', http_status: response.status });
        throw new Error(`HTTP ${response.status}`);
      }
      track('form_submit', {
        form_id: formId,
        interest: data.getAll('interesse').map(String).sort().join(','),
        optional_fields: optionalFilled(data),
      });
      const email = String(data.get('email') ?? '');
      success?.querySelectorAll<HTMLElement>('[data-success-email]').forEach((el) => (el.textContent = email));
      form.reset();
      form.hidden = true;
      setStatus('');
      form.dataset.state = 'sent';
      reveal(success);
    } catch (error) {
      if (!(error instanceof Error && error.message.startsWith('HTTP'))) {
        const type = error instanceof DOMException && error.name === 'AbortError' ? 'timeout' : 'rete';
        track('form_error', { form_id: formId, error_type: type });
      }
      form.dataset.state = 'error';
      setStatus('');
      const draft = failure?.querySelector<HTMLAnchorElement>('[data-mailto-draft]');
      if (draft) draft.href = mailtoDraft(data);
      reveal(failure);
    } finally {
      window.clearTimeout(timer);
      form.removeAttribute('aria-busy');
      submit?.removeAttribute('aria-disabled');
      if (form.dataset.state === 'sending') form.dataset.state = 'idle';
    }
  });
}

document.querySelectorAll<HTMLFormElement>('form[data-contact-form]').forEach(initForm);
